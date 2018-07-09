import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Footer from 'components/Footer'
import Header from 'components/Header'
import yeed from 'assets/images/ygg-logo-green.png'
import { AccountCard, NetworkCard, Key, KeyName, Button, Logo, Yeed } from "components/Shared";


const AppContainer = styled.div`
  background-color: #f2f6fa;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SendTxForm = styled.form`
  margin-top: 25px;
`;

const Submit = Button.withComponent("input").extend`
  margin-right:10px;
  border: 2px solid #305371;
  box-shadow:none;
  &:hover{
      box-shadow:none;
      transform:none;
  }
  &:disabled{
      color:#999;
      border: 2px solid #999;
      cursor:not-allowed;
      box-shadow:none;
  }
`;

const Input = Submit.extend`
  width: 200px;
  padding-left: 10px;
  &:active {
    background-color: transparent;
  }
  color: ${props => (props.hasError ? "#e74c3c" : "inherit")};
  border-color: ${props => (props.hasError ? "#e74c3c" : "inherit")};
`;

const AppPresenter = ({
  isLoading,
  address = "",
  balance = "0",
  toAddress = "",
  amount = 0,
  handleInput,
  handleSubmit
}) => (
  <AppContainer>
    <Header />
    <AccountCard>
      <Key>
        <KeyName>My Accounts 
          <Yeed><img src={yeed} alt="yeed" /></Yeed> {balance}
        </KeyName> 
        {address}
      </Key>
    </AccountCard>
    <NetworkCard>
      <Key>Network </Key>
      <Key>Peer </Key>
      <Key>Last Checked </Key>
    </NetworkCard>
    <Footer />
  </AppContainer>
);

AppPresenter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  address: PropTypes.string,
  balance: PropTypes.number,
  toAddress: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AppPresenter;



