import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex from "styled-flex-component";
import ReactModal from 'react-modal';
import yeed from 'assets/images/yeed-symbol.png';
import Store from "context/store";

const Account = styled.div`
  width: 100%;
  height:40px;
  border: 0;
  margin-bottom: 80px;
`;
const Address = styled.button`
  width: 250px;
  height:100px;
  border:0
  font-size: 0.9em;
  font-weight: 250;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  // background: #3cbaba
  // background: -webkit-linear-gradient(left,#21b5b5 , #147a7a);
  // background: -o-linear-gradient(right, #21b5b5, #147a7a); 
  // background: -moz-linear-gradient(right, #21b5b5, #147a7a); 
  // background: linear-gradient(to right, #21b5b5 , #147a7a); 

  // background: -webkit-linear-gradient(left,#174730 , #0c3b24);
  // background: -o-linear-gradient(right, #174730, #0c3b24); 
  // background: -moz-linear-gradient(right, #174730, #0c3b24); 
  // background: linear-gradient(to right, #174730 , #0c3b24); 

  background: -webkit-linear-gradient(left,#246948 , #0e4d2e);
  background: -o-linear-gradient(right, #246948, #0e4d2e); 
  background: -moz-linear-gradient(right, #246948, #0e4d2e); 
  background: linear-gradient(to right, #246948 , #0e4d2e); 
  display: flex;
  padding-top: 10px;
  padding-left: 10px;
  box-shadow: 0 2px 3px rgba(50, 50, 93, 0.05), 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    background-color:  #1D8074
    transform: translateY(-3px);
  }
  &:active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color:  #ecf0f1;
    transform: translateY(3px);
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
const Balance = styled.div`
  font-weight: 400;
  font-size: 1em;
  margin-top: ${props => (props.accountBox ? "9px" : "5px")}
  margin-left: ${props => {
    if(props.val){
      return "inherit"
    } else if(props.accountBox ){
      return "5px"
    } else {
      return "25px"
    }
  }}
  color:${props => (props.accountBox ? "#fcfcfc;" : "inherit")}
`;
const AccountBoxAddress = styled.div`
  // text-align:left;
  // flex: 1 1 100px;
  margin-top:${props => (props.name ? "5px" : "8px")}
  color: #fcfcfc;
`;
const AccountBoxYeed = styled.div`
  width: 15px;
  margin-right:5px;
  margin-top:10px;
`;

const AddressPresenter = ({ balace, address, name }) => (
    <Store.Consumer>
      {store => (
          <Account>
            <Flex alignCenter column>
              <Address
                onClick={() => store.AccountModal(address, name)}
              >
                <Flex alignCenter full column>
                    <AccountBoxAddress name>{name}</AccountBoxAddress> 
                    <AccountBoxAddress>{address.slice(0,23)}...{address.slice(39,42)}</AccountBoxAddress>
                  <Flex>
                    <AccountBoxYeed><img src={yeed} alt="yeed" /></AccountBoxYeed>
                    <Balance accountBox>{store.balance}</Balance>
                  </Flex>
                </Flex>
              </Address>
            </Flex>
          </Account>
      )}
    </Store.Consumer>
);

AddressPresenter.propTypes = {
  address: PropTypes.string,
  AccountModal: PropTypes.func.isRequired
};

ReactModal.setAppElement('body');

export default AddressPresenter;