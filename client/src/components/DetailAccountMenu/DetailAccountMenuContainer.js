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
      lowdb = remote.getGlobal("lowdb"),
      crypto = require('crypto'),
      secp256k1 = require('secp256k1'),
      { numberToHex, hexToNumber } = require('utils/txUtil');

class DetailAccountMenuContainer extends Component {
  constructor(props) {
    super(props);
    const { lowdb } = this.props;
    this.state = {
      password:"",
      toAddress:"",
      amount:"",
      isloading:false,
      close:false,
      txResult:""
    };

    // this._transaction = (selectAddress)=> {
    //   const { toAddress, amount, password } = this.state;
    //   this.setState({isloading:true, close:true});
    //   let privatekeyEncryptedKey = lowdb.get("principal").find({address:selectAddress}).value().EncryptedKey

    //   setTimeout(() =>{
    //     bip38Decrypt(privatekeyEncryptedKey, "asdfasdf" , (err, decryptedPrivateWif) => {
    //       if (err){
    //         console.log(err.msg);
    //         this.setState(() => {
    //           return {
    //             isloading:false,
    //             password:"",
    //             toAddress:"",
    //             amount:"",
    //           };
    //         });
    //         return err;
    //       }
    //       else {
    //         const decoded = wif.decode(decryptedPrivateWif)
    //         let privateKey = decoded.privateKey.toString("hex");
    //         console.log(privateKey)
    //         // const yeedAccount = fromPrivateKey(toBuffer(`0x${privateKey}`));
    //         const yeedAccount = fromPrivateKey(toBuffer(`0x35919d465e7704bcd97379f436fa38293151ebf728d23ddf7b6acf26dac13702`));
    //         const fromPrivateKeyBuffer = yeedAccount.getPrivateKey();
    //         const getTimestamp = Math.round(new Date().getTime() / 1000);

    //         // const data = {
    //         //   "operator":"transfer",
    //         //   "to":"5db10750e8caff27f906b41c71b3471057dd2001",
    //         //   "amount":10
    //         // }
    //         // let DataJson = dataToJson(data)
    //         var DataJson = "{\"method\":\"transfer\",\"params\":[\"address\":\"0xe1980adeafbb9ac6c9be60955484ab1547ab0b76\",\"amount\":0x099289739187289]}"
    //         // let type = "0x00000001"
    //         // let version = "0x00000002"
    //         // let dataSize = "0x0000000000000002"
    //         // let timestamp = "0x0000000000000009"
    //         let type = Buffer.from("00000000", 'hex').toString('hex')
    //         let version = Buffer.from("00000000", 'hex').toString('hex')
    //         let timestamp = Buffer.from("0001020304050607", 'hex').toString('hex')
    //         let dataSize = Buffer.from("0000000000000020", 'hex').toString('hex')
    //         const txHeaderData = {
    //           "type":`0x${type}`,
    //           "version":`0x${version}`,
    //           "dataHash":`0x${sha3(DataJson).toString("hex")}`,
    //           "dataSize":`0x${dataSize}`,
    //           "timeStamp":`0x${timestamp}`
    //         };
    //         const tx = new Tx(txHeaderData);
    //         const signature = tx.sign(fromPrivateKeyBuffer);
    //         // console.log(signature.r)
    //         console.log(signature)
    //         const dataHashHex = sha3(DataJson).toString("hex")
    //         console.log("dataHashHex", dataHashHex)
    //         const dataHash = Buffer.from(dataHashHex, 'hex').toString('base64')
    //         const vrs = numberToHex(signature.v).substring(2,4) + signature.r.toString("hex") + signature.s.toString("hex")
    //         console.log("vrs", vrs)
    //         const base64Vrs = Buffer.from(vrs, 'hex').toString('base64')
    //         let base64Type = Buffer.from(type, 'hex').toString('base64')
    //         let base64Version = Buffer.from(version, 'hex').toString('base64')
    //         const dataLengthNumber= hexToNumber(dataSize)
    //         const timestampNumber = hexToNumber(timestamp)
    //         let txData = {
    //           "type":base64Type,
    //           "version":base64Version,
    //           "data":DataJson,
    //           "dataHash":dataHash,
    //           "dataSize":dataLengthNumber,
    //           "timestamp":timestampNumber,
    //           "signature":base64Vrs
    //         }
    //         console.log(txData)
    //         // this.trasferTransaction(txData, selectAddress)
    //         this._transaction2(selectAddress)
    //         this.setState(() => {
    //           return {
    //             isloading:false,
    //             password:"",
    //             toAddress:"",
    //             amount:"",
    //             close:false
    //           };
    //         });
    //       }
    //     });
    //     }, 100)
    //  };

    this._transaction = (selectAddress)=> {
        let type = Buffer.from("00000000", 'hex').toString('hex')
        let version = Buffer.from("00000000", 'hex').toString('hex')
        let timestamp = Buffer.from("0001020304050607", 'hex').toString('hex')
        let dataSize = Buffer.from("0000000000000020", 'hex').toString('hex')
        // const data = {
        //   "operator":"transfer",
        //   "to":"5db10750e8caff27f906b41c71b3471057dd2001",
        //   "amount":10
        // }
        // let DataJson = dataToJson(data)
        var DataJson = "{\"method\":\"transfer\",\"params\":[\"address\":\"0xe1980adeafbb9ac6c9be60955484ab1547ab0b76\",\"amount\":0x099289739187289]}"
        var dataHash = sha3(DataJson).toString('hex')
      
        
        var dataForSignning = type + version + dataHash + timestamp + dataSize;
      
        var hash = sha3(dataForSignning)
        
        var privateKey = Buffer.from("35919d465e7704bcd97379f436fa38293151ebf728d23ddf7b6acf26dac13702", 'hex')
        
        var sigObject = secp256k1.sign(hash, privateKey)
        console.log(sigObject)
        var sigRS = sigObject.signature
        
        var v = sigObject.recovery + 27
        
        var signature = v.toString(16) + sigRS.toString('hex')
        
        console.log("dataHashHex=", dataHash)
        console.log("signature=", signature.toString('hex'))
        let signatureHex = Buffer.from(signature, 'hex').toString('hex')
        let base64Type = Buffer.from(type, 'hex').toString('base64')
        let base64Version = Buffer.from(version, 'hex').toString('base64')
        let base64DataHash = Buffer.from(dataHash, 'hex').toString('base64')
        let dataSizeNumber= hexToNumber(dataSize)
        let timestampNumber = hexToNumber(timestamp)
        let base64Vrs = Buffer.from(signatureHex, 'hex').toString('base64')

        let txData = {
          "type":base64Type,
          "version":base64Version,
          "data":DataJson,
          "dataHash":base64DataHash,
          "dataSize":dataSizeNumber,
          "timestamp":timestampNumber,
          "signature":base64Vrs
        }
        console.log(txData)
        this.trasferTransaction(txData, selectAddress)
        
     };
    
     this.trasferTransaction = async (params, address) => {
        let client  = await jayson.client.http(`${MASTER_NODE}/api/transaction`)
        client.request('sendTransaction', {tx: params}, (err, res) => {
          if(err) {
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
            close={this.state.close}
          />;
  }
}

export default DetailAccountMenuContainer;
