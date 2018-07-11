import React, { Fragment }  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex from "styled-flex-component";
import Maincard from "components/Maincard";
import Subcard from "components/Subcard";
import Header from 'components/Header';
import Store from "context/store";

const Footer = styled.span`
  font-weight: 600;
  color: #508464;
  margin-top: 100px;
`;

const AppPresenter = ({
  isLoading,
  address = "",
  balance = "",
  toAddress = "",
  amount = 0,
  handleInput,
  handleSubmit
}) => (
  <Fragment>
    <Header />
      <Flex alignCenter full column>
        <Store.Consumer>
          {store => {
            return Object.keys(store.notifications).map(key => (
              <Maincard
                key={store.notifications[key].id}
                id={store.notifications[key].id}
                text={store.notifications[key].text}
                balance={store.balance}
                address={store.address}
              />
            ));
          }}
        </Store.Consumer>
      </Flex>
      <Flex alignCenter full column>
        <Store.Consumer>
          {store => {
            return Object.keys(store.notifications).map(key => (
              <Subcard

              />
            ));
          }}
        </Store.Consumer>
      </Flex>
      <Flex alignCenter full column>
        <Footer>© 2018 Yggdrash</Footer>
      </Flex>
  </Fragment>

  
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