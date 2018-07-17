import React, { Fragment }  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex from "styled-flex-component";
import AccountBox from "components/AccountBox";
import NetworkBox from "components/NetworkBox";
import Header from 'components/Header';
import Store from "context/store";

const Footer = styled.span`
  font-weight: 600;
  color: #508464;
  margin-top: 100px;
`;

const AppPresenter = ({
  address = "",
  balance = ""
}) => (
  <Fragment>
    <Header />
      <Flex alignCenter full column>
        <Store.Consumer>
          {store => {
            return Object.keys(store.notifications).map(key => (
              <AccountBox
                key={store.notifications[key].id}
                id={store.notifications[key].id}
                text={store.notifications[key].text}
                balance={store.balance}
                address={store.address}
                mnemonic={store.mnemonic}
                importMnemonic={store.importMnemonic}
                AlertImportAccount={store.AlertImportAccount}
              />
            ));
          }}
        </Store.Consumer>
      </Flex>
      <Flex alignCenter full column>
        <Store.Consumer>
          {store => {
            return Object.keys(store.notifications).map(key => (
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
  address: PropTypes.string,
  balance: PropTypes.string
};

export default AppPresenter;