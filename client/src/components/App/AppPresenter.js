import React, { Fragment }  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex from "styled-flex-component";
import AccountBox from "components/AccountBox";
import NetworkBox from "components/NetworkBox";
import Header from 'components/Header';
import germinal from 'assets/images/germinal2.png';
// import grass from 'assets/images/grass.png';
import Store from "context/store";

const Footer = styled.div`
  // font-weight: 600;
  // color: #508464;
  // margin-top: 100px;
  // margin-bottom: 30px;
  width:230px;
`;

const Germinal = styled.div`
  width:50px;
  margin-bottom:10px;
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
                    word3={store.word3}
                    word6={store.word6}
                    word9={store.word9}
                    AlertImportAccount={store.AlertImportAccount}
                  />
                ));
              }}
            </Store.Consumer>
          </Flex>
          <Flex alignCenter full column>
          <Germinal><img src={germinal} alt="yggtree" /></Germinal>
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
            {/* <Footer><img src={grass} alt="grass" /></Footer> */}
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