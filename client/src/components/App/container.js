import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import axios from "axios";
import typography from "../../typography";
import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from "../../constants";
import AppPresenter from "./presenter";
import ksHelper from "accounts/keyGeneration";


const baseStyles = () => injectGlobal`
  ${reset};
  ${typography};
  h1,h2,h3,h4{
    margin-bottom:0!important;
  }
`;

class AppContainer extends Component {
  state = {
    isLoading: true,
    isMining: false,
    toAddress: "",
    amount: "0",
    passPharse:""
  };
  static propTypes = {
    sharedPort: PropTypes.number.isRequired
  };
  componentDidMount = () => {
    const { sharedPort } = this.props;
    this._registerOnMaster(sharedPort);
    this._getBalance(sharedPort);
    this._getAddress(sharedPort);
    setInterval(() => this._getBalance(sharedPort), 1000);
  };

  _createAccount = e => {
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


  render() {
    baseStyles();
    return (
      <AppPresenter
        {...this.state}
        handleInput={this._handleInput}
        handleSubmit={this._handleSubmit}
        createAccount={this._createAccount}
      />
    );
  }
  _registerOnMaster = async port => {
    const request = await axios.post(`${MASTER_NODE}/peers`, {
      peer: SELF_P2P_NODE(port)
    });
  };
  _getAddress = async port => {
    const request = await axios.get(`${SELF_NODE(port)}/my/address`);
    this.setState({
      address: request.data,
      isLoading: false
    });
  };
  _getBalance = async port => {
    const request = await axios.get(`${SELF_NODE(port)}/my/balance`);
    const { balance } = request.data;
    this.setState({
      balance
    });
  };


  _handleInput = e => {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value
    });
  };
  _handleSubmit = async e => {
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
}

export default AppContainer;
