import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from "../../constants";
import AppPresenter from "./AppPresenter";
import ksHelper from "accounts/keyGeneration";
import Store from "context/store";


class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      const { sharedPort } = this.props;
      this._registerOnMaster(sharedPort);
      this._getBalance(sharedPort);
      this._getAddress(sharedPort);
      setInterval(() => this._getBalance(sharedPort), 1000);
    };

    this._createAccount = e => {
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

    };

    this._registerOnMaster = async port => {
      const request = await axios.post(`${MASTER_NODE}/peers`, {
        peer: SELF_P2P_NODE(port)
      });
    };
    this._getAddress = async port => {
      const request = await axios.get(`${SELF_NODE(port)}/my/address`);
      this.setState({
        address: request.data,
        isLoading: false
      });
      console.log(request.data)
    };
    this._getBalance = async port => {
      const request = await axios.get(`${SELF_NODE(port)}/my/balance`);
      const { balance } = request.data;
      this.setState({
          balance :balance
      });
    };
  
  
    this._handleInput = e => {
      const { target: { name, value } } = e;
      this.setState({
        [name]: value
      });
    };

    this._handleSubmit = async e => {
      e.preventDefault();
      const { sharedPort } = this.props;
      const { amount, toAddress } = this.state;
      const request = await axios.post(`${SELF_NODE(sharedPort)}/transactions`, {
        amount: Number(amount),
        address: toAddress
      });
      this.setState({
        amount: "",
        toAddress: ""
      });
    };

    this._deleteNotification = id => {
      this.setState(currentState => {
        const newState = delete currentState.notifications[id];
        return newState;
      });
    };
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
      amount: "0",
      balance: "",
      address:"",
      passPharse:"",
      notifications: {
        "1": {
          id: 1,
          text: `My Accounts`
        }
      },
      deleteNotification: this._deleteNotification,
      seeNotification: this._seeNotification
    };
  }

  render() {
    return (
      // <AppPresenter
      //   {...this.state}
      //   handleInput={this._handleInput}
      //   handleSubmit={this._handleSubmit}
      //   createAccount={this._createAccount}
      // />
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
