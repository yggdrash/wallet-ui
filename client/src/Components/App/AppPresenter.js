import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Key, KeyName, Title } from "../Shared";
import './App.css';
import logo from '../../assets/images/ygg_symbol_shadow.png';

const AppContainer = styled.div`

`;

const Header = styled.div`
    display: flex;
    font-size: 1.5em;
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
`;


const AppPresenter = ({
  isLoading,
  address = "",
  balance = ""
}) => (
  <AppContainer>
    <Header>
      <img src={logo} className="App-logo" alt="logo" />
      <Title>{isLoading ? "Loading..." : "Yggdrash Wallet"}</Title>
    </Header>
    {/* <Card>
      <Key>
        <KeyName>Your address:</KeyName> {address}
      </Key>
      <Key>
        <KeyName>Your balance:</KeyName> {balance} YEED
      </Key>
    </Card> */}
  </AppContainer>
);

AppPresenter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  address: PropTypes.string,
  balance: PropTypes.number
};

export default AppPresenter;