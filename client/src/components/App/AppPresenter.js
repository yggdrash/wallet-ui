import React, { Fragment }  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex from "styled-flex-component";
import AccountBox from "components/AccountBox";
import NetworkBox from "components/NetworkBox";
import Header from 'components/Header';
import Store from "context/store";

const Footer = styled.div`
  margin-top: 60px;
  color: #fcfcfc;
`;

const AppPresenter = () => (
      <Fragment>
        <Header />
          <Flex alignCenter full column>
            <Store.Consumer>
              {store => {
                return Object.keys(store.accountBox).map(key => (
                  <AccountBox
                    key={store.accountBox[key].id}
                    id={store.accountBox[key].id}
                    isloading={store.isloading}
                    password={store.password}
                    passwordValid={store.passwordValid}
                    confirmPassword={store.confirmPassword}
                    text={store.text}
                    address={store.address}
                    selectAddress={store.selectAddress}
                    balance={store.balance}
                    mnemonic={store.mnemonic}
                    importMnemonic={store.importMnemonic}
                    word3={store.word3}
                    word6={store.word6}
                    word9={store.word9}
                    AlertImportAccount={store.AlertImportAccount}
                    toAddress={store.toAddress}
                    amount={store.amount}
                    recoveryPharse={store.recoveryPharse}
                    accountName={store.accountName}
                    AlertImportAccountName={store.AlertImportAccountName}
                    AlertImportAccountPass={store.AlertImportAccountPass}
                    AlertImportAccountConfirmPass={store.AlertImportAccountConfirmPass}
                    encrypteStatus={store.encrypteStatus}
                  />
                ));
              }}
            </Store.Consumer>
          </Flex>
          <Flex alignCenter full column>
            <Store.Consumer>
              {store => {
                return Object.keys(store.accountBox).map(key => (
                  <NetworkBox/>
                ));
              }}
            </Store.Consumer>
          </Flex>
          <Flex alignCenter full column>
            <Footer>© Akashic foundation</Footer>
          </Flex>
      </Fragment>
);

AppPresenter.propTypes = {
  // balance: PropTypes.string
    text: PropTypes.string,
    address: PropTypes.array,
    mnemonic: PropTypes.string,
    importMnemonic: PropTypes.string,
    createAccount: PropTypes.func.isRequired,
    createAccountModal: PropTypes.func.isRequired,
    importAccountModal: PropTypes.func.isRequired,
    importAccount: PropTypes.func.isRequired,
    generationMnemonic: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    selectAddress: PropTypes.string,
    toAddress: PropTypes.string,
    amount: PropTypes.string
};

AppPresenter.defaultProps = {
  createAccount: PropTypes.func,
  createAccountModal: PropTypes.func,
  importAccountModal: PropTypes.func,
  importAccount: PropTypes.func,
  generationMnemonic: PropTypes.func,
  closeModal: PropTypes.func,
};


export default AppPresenter;