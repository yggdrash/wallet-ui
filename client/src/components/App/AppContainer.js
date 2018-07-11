import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from "../../constants";
import AppPresenter from "./AppPresenter";
import ksHelper from "accounts/keyGeneration";
import Store from "context/store";

const bip39 = require("bip39");

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      const { sharedPort } = this.props;
      // this._registerOnMaster(sharedPort);
      // this._getBalance(sharedPort);
      // this._getAddress(sharedPort);
      // setInterval(() => this._getBalance(sharedPort), 1000);
    };

    /**
     * keyStore 파일 생성
     * keyStore data를 이용하여 get private key 
     * @method createAccount
    */
    this._createAccount = () => {
      // let mnemonic = bip39.generateMnemonic();
      let etherAccount = {};
      // let { passPharse } = this.state;
      let passPharse = 'pass'
      const { address, keystoreData } = ksHelper.create(passPharse);
      const pk = ksHelper.getPrivateKey(keystoreData, passPharse);
      const privateKey = pk.toString('hex');
      etherAccount = {
        address,
        privateKey
      };
      console.log("etherAccount",etherAccount.address)

      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications
          },
          address:etherAccount.address
        };
      });
    };

    // this._registerOnMaster = async port => {
    //   const request = await axios.post(`${MASTER_NODE}/peers`, {
    //     peer: SELF_P2P_NODE(port)
    //   });
    // };
    // this._getAddress = async port => {
    //   const request = await axios.get(`${SELF_NODE(port)}/my/address`);
    //   this.setState({
    //     address: request.data,
    //     isLoading: false
    //   });
    // };
    // this._getBalance = async port => {
    //   const request = await axios.get(`${SELF_NODE(port)}/my/balance`);
    //   const { balance } = request.data;
    //   this.setState({
    //       balance :balance
    //   });
    // };
  
    this._seeNotification = id => {
      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications,
            [id]: {
              ...currentState.notifications[id]
            }
          }
        };
      });
    };

    this.state = {
      isLoading: true,
      isMining: false,
      balance: "0",
      address:"",
      passPharse:"",
      notifications: {
        "1": {
          id: 1,
          text: `My Accounts`
        }
      },
      createAccount: this._createAccount,
      seeNotification: this._seeNotification
    };
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <AppPresenter />
      </Store.Provider>
    );
  }
}

AppContainer.propTypes = {
  sharedPort: PropTypes.number.isRequired
};

export default AppContainer;
