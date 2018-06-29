import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import './App.css';
// import logo from '../../assets/images/ygg_symbol_shadow.png';

const AppContainer = styled.div`
    margin: 50px 0;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const AppPresenter = ({
  isLoading,
  address = "",
  balance = ""
}) => (
  <AppContainer>
    {/* <Header>
      <img src={logo} className="App-logo" alt="logo" />
      <Title>{isLoading ? "Loading..." : "Yggdrash Wallet"}</Title>
      <Button disabled={isMining} onClick={mineBlock}>
        {isMining ? "Mining" : "Mine"}
      </Button>
    </Header>
    <Card>
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