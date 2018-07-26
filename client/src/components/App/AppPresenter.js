import React, { Fragment }  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex from "styled-flex-component";
import AccountBox from "components/AccountBox";
import NetworkBox from "components/NetworkBox";
import Header from 'components/Header';
import germinal from 'assets/images/germinal2.png';
import Store from "context/store";

const Footer = styled.span`
  font-weight: 600;
  color: #508464;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const Germinal = styled.div`
  width:50px;
`;

const AppPresenter = ({ }) => (
      <Fragment>
        <Header />
          <Flex alignCenter full column>
            <Store.Consumer>
              {store => {
                return Object.keys(store.account).map(key => (
                  <AccountBox
                    key={store.account[key].id}
                    id={store.account[key].id}
                    text={store.text}
                    address={store.address}
                    selectAddress={store.selectAddress}
                    balance={store.balance}
                    mnemonic={store.mnemonic}
                    importMnemonic={store.importMnemonic}
                    AlertImportAccount={store.AlertImportAccount}
                  />
                ));
              }}
            </Store.Consumer>
          </Flex>
          <Flex alignCenter full column>
          <Germinal><img src={germinal} alt="germinal" /></Germinal>
            <Store.Consumer>
              {store => {
                return Object.keys(store.account).map(key => (
                  <NetworkBox

                  />
                ));
              }}
            </Store.Consumer>
          </Flex>
          <Flex alignCenter full column>
            <Footer>© 2018 YGGDRASH</Footer>
          </Flex>
      </Fragment>
);

AppPresenter.propTypes = {
  // balance: PropTypes.string
    text: PropTypes.string,
    address: PropTypes.array,
    mnemonic: PropTypes.string,
    importMnemonic: PropTypes.string
};

export default AppPresenter;