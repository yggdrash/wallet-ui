import React, { Fragment }  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex from "styled-flex-component";
import Maincard from "components/Maincard";
import Subcard from "components/Subcard";
import Header from 'components/Header';
import Store from "context/store";

// import { AccountCard, NetworkCard, Key, KeyName, Button, Logo, Yeed } from "components/Shared";

const Footer = styled.span`
  font-weight: 600;
  color: #508464;
  margin-top: 100px;
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


{/* <AppContainer>
    <Header />
    <AccountCard>
      <Key>
        <KeyName>My Accounts 
          <Yeed><img src={yeed} alt="yeed" /></Yeed> 
          {balance}
        </KeyName> 
      </Key>
      <Button> <ImportAccount/> ImportAccount </Button>
      <Button> <CreateAccount/> Create Account </Button>
      {address}
    </AccountCard>
    <NetworkCard>
      <Key>Network </Key>
      <Key>Peer </Key>
      <Key>Last Checked </Key>
    </NetworkCard>
    <Footer />
  </AppContainer> */}




// const AppContainer = styled.div`
//   background-color: #f5f6fa
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
  
//   // background-image: url(${tree});
// `;


// const SendTxForm = styled.form`
//   margin-top: 25px;
// `;

// const Submit = Button.withComponent("input").extend`
//   margin-right:10px;
//   border: 2px solid #305371;
//   box-shadow:none;
//   &:hover{
//       box-shadow:none;
//       transform:none;
//   }
//   &:disabled{
//       color:#999;
//       border: 2px solid #999;
//       cursor:not-allowed;
//       box-shadow:none;
//   }
// `;

// const Input = Submit.extend`
//   width: 200px;
//   padding-left: 10px;
//   &:active {
//     background-color: transparent;
//   }
//   color: ${props => (props.hasError ? "#e74c3c" : "inherit")};
//   border-color: ${props => (props.hasError ? "#e74c3c" : "inherit")};
// `;