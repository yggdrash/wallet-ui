import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import Select from 'react-styled-select'
import ReactModal from 'react-modal';
import yeed from 'assets/images/yeed-symbol.png';
import { Yeed } from "components/Shared";
import { Download } from 'styled-icons/feather/Download';
import { PersonAdd } from 'styled-icons/material/PersonAdd';
import { Button } from 'components/Shared';
import Store from "context/store";

const AccountBox = styled.div`
  background-color: #ffffff;
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  width: 50%;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 90px;
  box-sizing: border-box;
  border: 2px solid rgba(0,0,0,.0975);
`;

const Account = styled.div`
  margin-top: 10px;
  &:hover {
    ${props => {
      if (props.addr) {
        return (
          "box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);",
          "ransform: translateY(-1px);"
        )
      }
    }};
  }
`;

const Title = styled.span`
  font-weight: 400;
  display: flex;
  font-size: 1.3em;
  margin-left: 10px;
`;

const Line = styled.div`
  border-bottom: 0.1px solid rgb(105,105,105);
  width: 100%;
  margin-top: ${props => {
    if (props.two) {
      return "15px;";
    }
  }};
`;

const Address = styled.span`
  font-weight: 400;
  font-size: 1.1em;
  width: 100%;
  display: flex;
`;

const Balance = styled.div`
  font-weight: 300;
  font-size: 1.1em;
  margin-top: ${props => {
      if (props.yeed) {
        return "26px;";
      }
    }};
  margin-left: 5px;
  width: 15px;
`;


const ImportAccount = styled(Download)`
  width: 20px;
  margin-right:7px;
`

const CreateAccount = styled(PersonAdd)`
  width: 20px;
  margin-right:7px;
`

const Modal = styled(ReactModal)`
  width: 50%;
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 40px;
  background-color: papayawhip;
`

const AccountBoxPresenter = ({ id, text, balance, address }) => (
  <AccountBox >
    <Flex alignCenter justifyBetween>
      <Title>
        {text} 
        <Yeed><img src={yeed} alt="yeed" /></Yeed>
        {balance}
      </Title>
    </Flex>
    <Line/>
    <Flex alignCenter justifyBetween>
      <FlexItem>
        <Fragment>
          <Store.Consumer>
            {store => (
              <Fragment>
                <Button
                  import
                  onClick={() => store.importAccount()}
                >
                <ImportAccount/> 
                IMPORT ACCOUNT
                </Button>
                  <Modal 
                    isOpen={store.showModal}
                    style={{
                      content: {
                        color: 'lightsteelblue'
                      }
                    }}
                  >
                    <Button onClick={() => store.importAccount()}>Close</Button>
                  </Modal>


                <Button
                  onClick={() => store.createAccount()}
                >
                <CreateAccount/>
                CREATE ACCOUNT
                </Button>
              </Fragment>
            )}
          </Store.Consumer>
        </Fragment>
      </FlexItem>
    </Flex>
    <Line two/>
    <Account>
      <Flex alignCenter justifyBetween>
        <Address addr>{address}</Address>
        <FlexItem>
          <Balance 
            yeed
          >
          {address ?  <img src={yeed} alt="yeed" />: null}
          </Balance>
        </FlexItem>
        <FlexItem>
          <Balance>{address ? balance : null}</Balance>
        </FlexItem>
      </Flex>
    </Account>
  </AccountBox>
);

AccountBoxPresenter.propTypes = {
  text: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

export default AccountBoxPresenter;
