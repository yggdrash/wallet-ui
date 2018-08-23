import React, { Component } from "react";
import DetailAccountMenuPresenter from "./DetailAccountMenuPresenter";
import { toBuffer } from "utils";
import { fromPrivateKey } from "accounts/wallet";
import { MASTER_NODE } from "../../constants";
import Tx from "transaction";

const bip38Decrypt = require('bip38-decrypt'),
      wif = require('wif'),
      { sha3, dataToJson } = require('utils'),
      { remote } = window.require("electron"),
      jayson = remote.getGlobal("jayson"),
      { numberToHex, hexToNumber, isAddress } = require('utils/txUtil');

class DetailAccountMenuContainer extends Component {
  constructor(props) {
    super(props);
    const { lowdb, close } = this.props;
    this.state = {
      password:"",
      toAddress:"",
      amount:"",
      isloading:false,
      close:false,
      alertInput:""
    };

    this.componentDidMount = () => {
      document.body.addEventListener("keydown", this.closeLastPopup)
    };

    this.closeLastPopup = e => {
      if (!(e.key === "Escape" || e.keyCode === 27)) return
      this.setState({ 
        isloading:false,
        password:"",
        toAddress:"",
        amount:""
      })
     }

    this._transaction = (selectAddress)=> {
      const { toAddress, amount, password } = this.state;
      this.setState({isloading:true, close:true});
      let privatekeyEncryptedKey = lowdb.get("principal").find({address:selectAddress}).value().EncryptedKey
      if(toAddress===""){
        this.setState(() => {
          return {
            alertInput:"Please enter to address.",
            isloading:false
          };
        });
      }else if(!isAddress(toAddress)){
        this.setState(() => {
          return {
            alertInput:"The address format is not correct.",
            isloading:false
          };
        });
      }else if(password===""){
        this.setState(() => {
          return {
            alertInput:"Please enter this wallet password.",
            isloading:false
          };
        });
      }else {
        setTimeout(() =>{
        bip38Decrypt(privatekeyEncryptedKey, password , (err, decryptedPrivateWif) => {
          if (err){
            console.log(err.msg);
            this.setState(() => {
              return {
                isloading:false,
                password:"",
                toAddress:"",
                amount:"",
              };
            });
            return err;
          }
          else {
            const decoded = wif.decode(decryptedPrivateWif)
            let privateKey = decoded.privateKey.toString("hex");
            const yeedAccount = fromPrivateKey(toBuffer(`0x${privateKey}`));
            const fromPrivateKeyBuffer = yeedAccount.getPrivateKey();
            const getTimestamp = Math.round(new Date().getTime() / 1000);
            let address40 = toAddress.substring(2)
            const data = {
              "method":"transfer",
              "params":[
                { 
                  address :address40
                },
                { 
                  amount :amount
                }
              ]
            }
            let DataJson = dataToJson(data)
            let dataLength = DataJson.length
            let type = Buffer.from("00000000", 'hex').toString('hex')
            let version = Buffer.from("00000000", 'hex').toString('hex')
            let dataSize = this.decimalToHex(DataJson.length)
            let timestamp = this.decimalToHex(getTimestamp);
            const dataHashHex = sha3(DataJson).toString("hex")
            const tx = new Tx(this.txHeaderData(type, version, dataHashHex, dataSize, timestamp));
            const signature = tx.sign(fromPrivateKeyBuffer);
            const txDataObject = this.txData(signature, dataHashHex, type, version, dataLength, getTimestamp, DataJson)
            this.trasferTransaction(txDataObject, selectAddress)
            this.setState(() => {
              return {
                isloading:false,
                password:"",
                toAddress:"",
                amount:"",
                close:false
              };
            });
          }
        });
        }, 100)
      }

      setTimeout(() =>{
        this.setState({
            alertInput:"",
        });
      }, 2000)
     };

     this.decimalToHex = (d) => {
        var hex = Number(d).toString(16);
        hex = "0000000000000000".substr(0, 16 - hex.length) + hex; 
        return hex;
      }

     this.txHeaderData = (type, version, dataHashHex, dataSize, timestamp) =>{
        const txHeaderData = {
          "type":`0x${type}`,
          "version":`0x${version}`,
          "dataHash":`0x${dataHashHex}`,
          "timeStamp":`0x${timestamp}`,
          "dataSize":`0x${dataSize}`
        };
        return txHeaderData
     }

     this.txData = (signature, dataHashHex, type, version, dataSize, timestamp, DataJson) => {
        const dataHash = Buffer.from(dataHashHex, 'hex').toString('base64')
        const vrs = numberToHex(signature.v).substring(2,4) + signature.r.toString("hex") + signature.s.toString("hex")
        const base64Vrs = Buffer.from(vrs, 'hex').toString('base64')
        let base64Type = Buffer.from(type, 'hex').toString('base64')
        let base64Version = Buffer.from(version, 'hex').toString('base64')
        const dataLengthNumber= hexToNumber(dataSize)
        const timestampNumber = hexToNumber(timestamp)
        let txData = {
          "type":base64Type,
          "version":base64Version,
          "dataHash":dataHash,
          "dataSize":dataLengthNumber,
          "timestamp":timestampNumber,
          "signature":base64Vrs,
          "data":DataJson
        }
        console.log(txData)
        return txData
     }
    
     this.trasferTransaction = async (params, address) => {
        let client  = await jayson.client.http(`${MASTER_NODE}/api/transaction`)
        client.request('sendTransaction', {tx: params}, (err, res) => {
          if(err) {
            console.log(err)
            throw err
          } else {
            console.log(res)
            lowdb.get('transaction').push({
              address:address,
              txId:res.result
            }).write()
          }
        })
      };

     this._handleInput = e => {
        const { target: { name, value } } = e;
        this.setState({
          [name]: value
        });
      };

  }

  render() {
    return <DetailAccountMenuPresenter {...this.props} {...this.state} 
            transaction={this._transaction}
            handleInput={this._handleInput}
            isloading={this.state.isloading}
            close={this.props.close}
            alertInput={this.state.alertInput}
          />;
  }
}

export default DetailAccountMenuContainer;
