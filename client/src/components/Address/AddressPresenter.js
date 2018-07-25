import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import ReactModal from 'react-modal';
import QRCode from 'qrcode-react';
import { Button } from 'components/Shared';
import ModalHeader from 'components/AddressHeader';
import { Copy } from "styled-icons/feather/Copy";
import { Send } from "styled-icons/feather/Send";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import yeed from 'assets/images/yeed-symbol.png';
import { Yeed } from "components/Shared";
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
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 3px rgba(50, 50, 93, 0.05), 0 1px 2px rgba(0, 0, 0, 0.08);
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

const DetailAddress = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #ffffff;
  height:40px;
  font-size: 1em;
  font-weight: 400;
  margin-bottom: 10px;
  margin-left: ${props => (props.tx ? "200px" : "20px")}
  margin-top: 10px;
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


const AddressCopy = styled(Copy)`
  width:20px;
  margin-right:5px;
  color: black;
`

const Transaction = styled(Send)`
  width:20px;
  margin-right:5px;
  color: black;
`


const Info = styled.div`
  width: 90%;
  height: 150px;
  margin-top: 40px;
  margin-left: 65px;
  border: 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  display: flex;
  font-weight: 200;
  font-size: 1em;
  padding-left: 10px;
`;

const Label = styled.div`
  margin-top:20px;
  margin-left:25px;
  font-size:1.3em;
  font-weight:400;
`;

const QR = styled.div`
  margin-top:10px;
`;

const Modal = styled(ReactModal)`
  border: 0;
  width: 90%;
  height: 90%;
  position: absolute;
  top: 5%
  left: 5%;
  background-color: #508464; //#2c3e50
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

const HeaderIcon = styled.button`
  border: 0;
  width: 35px;
  height: 40px;
  justify-content: center;
  background-color: #ffffff;
  align-items: center;
  border-radius: 10px;
  margin-right: 30px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    transform: translateY(-1px);
    background-color:  #ecf0f1;
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    transform: translateY(1px);
    background-color:  #ecf0f1;
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
  font-weight: 350;
  font-size: 0.9em;
  margin-top: 5px;
  margin-left: ${props => (props.val ? "inherit" : "25px")}
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
            <ModalHeader/>

              {/* <FlexItem>
                <Info>
                  <FlexItem>
                    <QRCode value={store.selectAddress} />
                  </FlexItem>
                  <FlexItem>
                  Address
                  </FlexItem>
                  <FlexItem>
                    <Flex>
                      d
                    </Flex>
                  </FlexItem>
                  <FlexItem>
                    <DetailAddress
                      onClick={() => {}}
                    >
                    <AddressCopy/>
                    {store.selectAddress}
                    </DetailAddress>
                  </FlexItem>
                </Info>
              </FlexItem> 
              <Transaction/>*/}
              <Info>
                <Flex full >
                  <FlexItem>
                    <QR>
                      <QRCode value={store.selectAddress} />
                    </QR>
                  </FlexItem>
                  <FlexItem>
                    <Label>Address</Label>
                    <CopyToClipboard text={store.selectAddress}
                      onCopy={true}  
                    >
                      <DetailAddress>
                        <AddressCopy/>
                        {store.selectAddress}
                      </DetailAddress>
                    </CopyToClipboard>
                    <Flex>
                      <Balance>Balance </Balance>
                      <Yeed><img src={yeed} alt="yeed" /></Yeed>
                      <Balance val>0</Balance>
                    </Flex>
                  </FlexItem>
                </Flex>
                <Flex full>
                 <DetailAddress tx>
                    <Transaction/>
                  </DetailAddress>
                </Flex>
              </Info>

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