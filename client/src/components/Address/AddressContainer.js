import React, { Component } from "react";
import PropTypes from "prop-types";
import AddressPresenter from "./AddressPresenter";
import { MASTER_NODE } from "../../constants";
import update from 'react-addons-update';

const { remote } = window.require("electron"),
      jayson = remote.getGlobal("jayson"),
      lowdb = remote.getGlobal("lowdb"),
      { dataToJson } = require('utils');
class AddressContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // balance:[]
    };
    // this.componentDidMount = () => {
    //   this.balanceOf()
    //   setInterval(this.balanceOf, 10000);
    //   console.log(lowdb.get("accounts").map("address").value().length)
    // };

    // this.balanceOf = async () => {
    //   let client  = await jayson.client.http(`${MASTER_NODE}/api/account`)
    //   lowdb.get("accounts").map("address").value().map(addr => {
    //     try {
    //       let address40 = addr.substring(2)
    //       const balanceParamsdata = {
    //         "address":address40,
    //         "method":"balanceOf",
    //         "params":[
    //           { 
    //             address :address40
    //           }
    //         ]
    //       }
    //       let balanceParamsdataJson = dataToJson(balanceParamsdata)
    //       client.request('balanceOf', {data: balanceParamsdataJson}, (err, res) => {
    //         if(err) {
    //           throw err
    //         } else {
    //           this.setState({
    //             balance: update(
    //               this.state.balance,
    //               {
    //                   $push: [JSON.parse(res.result).result]
    //               }
    //             ),
    //           })
    //         }
    //       });
    //     }catch (e) {
    //       console.log(e)
    //     }
    //   });
    // };

  }

  render() {
    return <AddressPresenter {...this.props} {...this.state}
              lowdb={this.props.lowdb}
            />
  }
}

AddressContainer.propTypes = {};

AddressContainer.defaultProps = {
  address: PropTypes.string,
  AccountModal: PropTypes.func.isRequired,
  selectAddress: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  handleTooltip: PropTypes.func.isRequired,
  toAddress: PropTypes.string,
  amount: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AddressContainer;
