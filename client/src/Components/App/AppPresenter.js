import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Key, KeyName, Title, Logo } from "../Shared"; //, Button
import logo from '../../assets/images/ygg_symbol_shadow.png';
//import { Peer } from '../icons/icon-kit'; //Network, Config, Quit,

const AppContainer = styled.div`
  
`;

const Header = styled.div`
    display: flex;
    height: 80px;
    background-color: #222; 
    padding: 15px;
`;

const AppPresenter = ({
  isLoading,
  address = "",
  balance = ""
}) => (
  <AppContainer>
    <Header>
      <Logo><img src={logo} alt="logo" /></Logo>
      <Title>{isLoading ? "Loading..." : "Yggdrash Wallet"}</Title>
    </Header>
    <Card>
      <Key>
        <KeyName>Your address:</KeyName> {address}
      </Key>
      <Key>
        <KeyName>Your balance:</KeyName> {balance} YEED
      </Key>
    </Card>
  </AppContainer>
);

AppPresenter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  address: PropTypes.string,
  balance: PropTypes.number
};

export default AppPresenter;