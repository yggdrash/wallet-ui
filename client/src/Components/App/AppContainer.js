import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import axios from "axios";
import typography from "../../typography";
import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from "../../constants";
// import AppPresenter from "./AppPresenter";
import './App.css';
import logo from '../../assets/images/ygg_symbol_shadow.png';

const baseStyles = () => injectGlobal`
  ${reset};
  ${typography};
  h1,h2,h3,h4{
    margin-bottom:0!important;
  }
`;

  
class AppContainer extends Component {
    state = {
        isLoading: true
    };

    static PropTypes = {
        sharedPort: PropTypes.number.isRequired
    };

    componentDidMount = () => {
        const { sharedPort } = this.props;
        this._registerOnMaster(sharedPort);
        this._getBalance(sharedPort);
        this._getAddress(sharedPort);
        setInterval(() => this._getBalance(sharedPort), 1000);
    };

    render() {
        baseStyles();
        return (
          <div className="AppContainer">
            <header className="App-header">
            <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Yggdrash Wallet</h1>
            </div>
            </header>
          </div>
            // <AppPresenter {...this.state}/>
        );
    };

    //todo : 마스터 노드에게 post request(마스터노드 등록)
    _registerOnMaster = async port => {
        const request = await axios.post(`${MASTER_NODE}/peers`, {
            peer: SELF_P2P_NODE(port)
        });
        console.log("MASTER_NODE request data :", request)
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
}

export default AppContainer;