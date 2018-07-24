import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import ReactModal from 'react-modal';
import { Button } from 'components/Shared';
import { Route, Switch } from "react-router-dom";
import DetailAccount from "components/DetailAccount";
// import yeed from 'assets/images/yeed-symbol.png';
import Store from "context/store";

const accountProp = "account"

const Account = styled.div`
  width: 100%;
  height:40px;
  border: 0;
  margin-bottom: 10px;
`;

const Address = styled.button`
  width: 750px;
  height:40px;
  border: 0;
  font-size: 0.9em;
  font-weight: 250;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  text-align: left;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
    background-color:  #ecf0f1;
  }
  &:active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color:  #ecf0f1;
    transform: translateY(1px);
  }
  &:disabled {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #009432;
    transform: none;
    cursor: progress;
    &:focus,
    &:active,
    &:hover {
      transform: none;
    }
  }
`;


const Info = styled.div`
  width: 90%;
  margin-top: 40px;
  margin-left: 65px;
  height: 100px;
  border: 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  // text-align: ${props => (props.mnemonic ? "left;" : "center;")};
  font-weight: 200;
  font-size: 1em;
  border: 1px solid #305371
  padding-top: 12px;
`;

const Modal = styled(ReactModal)`
  border: 0;
  width: 90%;
  height: 90%;
  position: absolute;
  top: 5%
  left: 5%;
  background-color: #ecf0f1;
  border: 2px solid rgba(0,0,0,.0975);
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-sizing: border-box;
  border-color: rgba(70, 219, 115, 0);
  &:focus,
  &:active {
    outline: none;
  }
`

const Balance = styled.div`
  font-weight: 300;
  font-size: 1.1em;
  margin-top: ${props => (props.yeed ? "26px;" : "inherit")};
  margin-left: 5px;
  width: 15px;
`;


const AddressPresenter = ({ balance, address, selectAddress }) => (
  <Fragment>
    <Store.Consumer>
      {store => (
          <Account>
          <Flex alignCenter justifyBetween>
            <FlexItem>
                <Fragment>
                  <Address
                    onClick={() => store.AccountModal(address)}
                  >
                    {address}
                  </Address>
                </Fragment>
            </FlexItem>

            <Modal
                  isOpen={store.showAccountModal}
                  style={{
                    content: {
                      color: 'black'
                    }
                  }}
                >
                  <FlexItem>
                    <Info>
                      {store.selectAddress}
                    </Info>
                  </FlexItem>
                  <Flex alignCenter justifyBetween>
                    <FlexItem>
                      <Fragment/>
                    </FlexItem>
                    <FlexItem>
                      <Fragment>
                        <Button 
                          onClick={() => store.closeModal(accountProp)}>
                          CLOSE
                        </Button>
                      </Fragment>
                    </FlexItem>
                  </Flex>
                </Modal>
          </Flex>
          </Account>
      )}
    </Store.Consumer>
  </Fragment>
);

AddressPresenter.propTypes = {
  address: PropTypes.array
};

ReactModal.setAppElement('body');

export default AddressPresenter;