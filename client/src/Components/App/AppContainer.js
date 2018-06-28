import React, { Component } from "react";
// import PropTypes from "prop-types";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
// import axios from "axios";
import typography from "../../typography";
// import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from "../../constants";
// import AppPresenter from "./AppPresenter";
import logo from './ygg_symbol_shadow.png';
import './App.css';

const baseStyles = () => injectGlobal`
  ${reset};
  ${typography};
  h1,h2,h3,h4{
    margin-bottom:0!important;
  }
`;

//todo : 마스터 노드에게 post request(마스터노드 등록)

class AppContainer extends Component {
  render() {
    baseStyles();
    return (
      <div className="AppContainer">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Yggdrash Wallet</h1>
        </header>
      </div>
    );
  }
}

export default AppContainer;
