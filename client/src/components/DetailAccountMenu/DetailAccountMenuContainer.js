import React, { Component } from "react";
import DetailAccountMenuPresenter from "./DetailAccountMenuPresenter";
import { toBuffer } from "utils";
import { fromPrivateKey } from "accounts/wallet";
import { MASTER_NODE } from "../../constants";
import Tx from "transaction";


const { remote } = window.require("electron");
const jayson = remote.getGlobal("jayson");

const bip38Decrypt = require('bip38-decrypt'),
      wif = require('wif'),
      { sha3, dataToJson } = require('utils'),
      { toHex, hexToBytes, Base64, numberToHex } = require('utils/txUtil'),
      bufferConcat = require('array-buffer-concat');

class DetailAccountMenuContainer extends Component {
  constructor(props) {
    super(props);
    const { lowdb } = this.props;
    this.state = {
      password:"",
      toAddress:"",
      amount:"",
      isloading:false,
      close:false
    };

    this._transaction = selectAddress => {
      const { toAddress, amount, password } = this.state;
      this.setState({isloading:true, close:true});
      let privatekeyEncryptedKey = lowdb.get("principal").find({address:selectAddress}).value().EncryptedKey

      setTimeout(() =>{
        bip38Decrypt(privatekeyEncryptedKey, "asdfasdf" , (err, decryptedPrivateWif) => {
          if (err){
            console.log(err.msg);
            this.setState(currentState => {
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
            const fromAddress = yeedAccount.getAddressString();
            const fromPrivateKeyBuffer = yeedAccount.getPrivateKey();
            const getTimestamp = Math.round(new Date().getTime() / 1000);

            const data = {
              "operator":"transfer",
              "to":"5db10750e8caff27f906b41c71b3471057dd2001",
              "amount":10
            }
            let DataJson = dataToJson(data)
            const txHeaderData = {
              "type":"0x00000000",
              "version":"0x00000000",
              "dataHash":`0x${sha3(DataJson).toString("hex")}`,
              "dataSize":DataJson.length,
              "timeStamp":getTimestamp
            };
            const tx = new Tx(txHeaderData);
            const signature = tx.sign(fromPrivateKeyBuffer);
            const dataHashHex = sha3(DataJson).toString("hex")
            const dataHash = Buffer.from(dataHashHex, 'hex').toString('base64')
            const vrs = numberToHex(signature.v).substring(2,4) + signature.r.toString("hex") + signature.s.toString("hex")
            const base64Vrs = Buffer.from(vrs, 'hex').toString('base64')

            let txData = {
              "type":"AAAAAQ==",
              "version":"AAAAAQ==",
              "data":DataJson,
              "dataHash":dataHash,
              "dataSize":DataJson.length,
              "timestamp":getTimestamp,
              "signature":base64Vrs
            }
            
            // let txDataJson = dataToJson(txData)
            console.log(txData)
            this.trasferTransaction(txData)
            this.setState(currentState => {
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
        
     };

      // this.concatTypedArrays = (a, b) => {
      //   var c = new (a.constructor)(a.length + b.length);
      //   c.set(a, 0);
      //   c.set(b, a.length);
      //   return c;
      // }
    
     this.trasferTransaction = async params => {
        let client  = await jayson.client.http(`${MASTER_NODE}/api/transaction`)
        client.request('sendTransaction', {tx: params}, (err, res) => {
          if(err) throw err
          console.log(res)
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
            close={this.state.close}
          />;
  }
}

export default DetailAccountMenuContainer;
