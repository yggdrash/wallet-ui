import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Key, KeyName, Title, Logo } from "../Shared";
import logo from '../../assets/images/ygg_symbol_shadow.png';

const AppContainer = styled.div`
  
`;

const Header = styled.div`
    display: flex;
    height: 85px;
    background-color: #222; 
    padding: 15px;
    color: white;
`;


const AppPresenter = ({
  isLoading,
  address = "",
  balance = ""
}) => (
  <AppContainer>
    <Header>
      <Logo><img src={logo} className="App-logo" alt="logo" /></Logo>
      <Title>{isLoading ? "Loading..." : "Yggdrash Wallet"}</Title>
    </Header>
    <Card>
      <Key>
        <KeyName>Your address:</KeyName> {address}
      </Key>
      {/* <Key>
        <KeyName>Your balance:</KeyName> {balance} YEED
      </Key> */}
    </Card>
  </AppContainer>
);

AppPresenter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  address: PropTypes.string,
  balance: PropTypes.number
};

export default AppPresenter;