import React, { Component } from "react";
import DetailAccountPresenter from "./DetailAccountPresenter";
import { MASTER_NODE } from "../../constants";

const { remote } = window.require("electron"),
      jayson = remote.getGlobal("jayson"),
      { dataToJson } = require('utils');
class DetailAccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied:false,
      copyHidden:true,
      top: 0,
      left: 0,
      name:"",
      balance:"",
      txResult:[],
      txReceipt:{},
      txReceiptOpen:false
    };

    this.componentDidMount = () => {
      this.balanceOf()
      setInterval(this.balanceOf, 10000);
      this.getAllTransactionReceipt()
      setInterval(this.getAllTransactionReceipt, 10000);

    };

    this._copy = () => {
      this.setState(() => {
        return {
          copied:true
        }
      })
      setTimeout(() =>{
        this.setState(() => {
          return {
            copied:false
          };
        });
      }, 1000)
    }

    this.getBalanceData = () => {
      let address = "0x2d2c2bf8cbb6f883850409b752f2d57d8dc46c59"
      var address40 = address.substring(2)
      const balanceParamsdata = {
        "address":address40,
        "method":"balanceOf",
        "params":[
          { 
            address :address40
          }
        ]
      }
      let balanceParamsdataJson = dataToJson(balanceParamsdata)
      return balanceParamsdataJson
    }

    this.balanceOf = async () => {
      let params = this.getBalanceData();
      let client  = await jayson.client.http(`${MASTER_NODE}/api/account`)
      client.request('balanceOf', {data: params}, (err, res) => {
        if(err) {
          console.log(err)
          throw err
        } else {
          this.setState({
            balance:JSON.parse(res.result).result
          })
        }
      })
    };

    this.getAllTransactionReceipt = async () => {
      let client  = await jayson.client.http(`${MASTER_NODE}/api/transaction`)
      client.request('getAllTransactionReceipt', {}, (err, res) => {
        if(err) {
          console.log(err)
          throw err
        } else {
          console.log(res.result)
          for(let tx in res.result){
            this.setState({txResult : tx})
          }
        }
      })
    }

    this._getTransactionReceipt = async (txId) => {
      let client  = await jayson.client.http(`${MASTER_NODE}/api/transaction`)
      client.request('getTransactionReceipt', {hashOfTx:txId}, (err, res) => {
        if(err) {
          console.log(err)
          throw err
        } else {
          this.setState({
            txReceipt:res.result,
            txReceiptOpen:true
          })
        }
      })
    }

    this._close = () =>{
      this.setState({
        txReceiptOpen:false
      })
    }

    this._handleTooltip = (ev, copyHidden) => {
      this.setState({
        top: ev.target.offsetTop + 5,
        left: ev.target.offsetLeft + ev.target.offsetWidth + 5,
        copyHidden
      });
    }
  }

  render() {
    return <DetailAccountPresenter {...this.props} {...this.state} 
            copy={this._copy}
            top={this.state.top}
            left={this.state.left}
            copied={this.state.copied}
            copyHidden={this.state.copyHidden}
            handleTooltip={this._handleTooltip}
            getTransactionReceipt={this._getTransactionReceipt}
            balance={this.state.balance}
            txResult={this.state.txResult}
            txReceipt={this.state.txReceipt}
            txReceiptOpen={this.state.txReceiptOpen}
            close={this._close}
          />;
  }
}

export default DetailAccountContainer;
