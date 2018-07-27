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
import { Download } from "styled-icons/feather/Download";
import { Edit2 } from "styled-icons/feather/Edit2";
import { Delete } from "styled-icons/material/Delete";
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
  margin-left: 20px;
  display:flex;
  flex: 1 1 100px;
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

const AccountIcon = styled.button`
  border: 0;
  width: 100px;
  height: 40px;
  justify-content: center;
  background-color: #ffffff;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 50px;
  margin-left: ${props => (props.first ? "30px;": "inherit")}
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


const AddressCopyIcon = styled(Copy)`
  width:20px;
  margin-right:5px;
  color: black;
`
const TransactionIcon = styled(Send)`
  width:20px;
  margin-right:5px;
  color: black;
`
const ExportIcon = styled(Download)`
  width:20px;
  margin-right:5px;
  color: black;
`
const EditIcon = styled(Edit2)`
  width:20px;
  margin-right:5px;
  color: black;
`
const DeleteIcon = styled(Delete)`
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

const TransactionInfo = styled.div`
  width: 90%;
  height: 450px;
  margin-top: 40px;
  margin-left: 65px;
  margin-bottom: 5px;
  border: 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  display: flex;
  font-weight: 200;
  font-size: 1em;
  padding-left: 10px;
  overflow:scroll;
`;

const Transactions = styled.button`
  border: 0;
  width: 150px;
  height: 40px;
  justify-content: center;
  background-color: #ffffff;
  border-bottom: 0.1px solid rgb(105,105,105);
  align-items: center;
  margin-top: 10px;
  margin-right: 50px;
  margin-left: ${props => (props.first ? "30px;": "inherit")}
  font-size:1.1em;
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

const TransactionsData = styled.button`
  border: 0;
  height: 40px;
  background-color: #ffffff;
  margin-top: 10px;
  margin-left:10px;
  font-size:0.9em;
  text-align:left;
  // display:flex;
  flex-wrap:wrap;
  &:focus,
  &:active {
    outline: none;
  }
`;

const Label = styled.div`
  margin-top:20px;
  margin-left:20px;
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
  background-color: #FAFAFA;
  border: 2px solid rgba(0,0,0,.0975);
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-sizing: border-box;
  border-color: rgba(70, 219, 115, 0);
  &:focus,
  &:active {
    outline: none;
  }
  -webkit-animation-name: zoom;
    -webkit-animation-duration: 0.5s;
    animation-name: zoom;
    animation-duration: 0.5s;
  @-webkit-keyframes zoom {
      from {-webkit-transform:scale(0)} 
      to {-webkit-transform:scale(1)}
  }
  
  @keyframes zoom {
      from {transform:scale(0)} 
      to {transform:scale(1)}
  }
`

const Balance = styled.div`
  font-weight: 400;
  font-size: 1em;
  margin-top: 5px;
  margin-left: ${props => (props.val ? "inherit" : "25px")}
`;


const AccountBoxAddress = styled.div`
  text-align:left;
  flex: 1 1 100px;
`;
const AccountBoxYeed = styled.div`
  width: 15px;
  margin-right:5px;
`;
const AccountBoxBalance = styled.div`
`;
// const Line = styled.div`
//   border-bottom: 0.1px solid rgb(105,105,105);
//   width:410%;
// `;

const AddressPresenter = ({ balance, address }) => (
  <Fragment>
    <Store.Consumer>
      {store => (
          <Account>
          <Flex>
            <FlexItem>
              <Address
                onClick={() => store.AccountModal(address)}
              >
                <Fragment>
                  <AccountBoxAddress>{address}</AccountBoxAddress>
                </Fragment>
                <Fragment>
                  <AccountBoxYeed><img src={yeed} alt="yeed" /></AccountBoxYeed>
                </Fragment>
                <Fragment>
                  <AccountBoxBalance>0</AccountBoxBalance>
                </Fragment>
              </Address>
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
                      <DetailAddress
                        
                      >
                        <AddressCopyIcon/>
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
                  <AccountIcon first>
                    <TransactionIcon/> TRANSFER
                  </AccountIcon>
                  <AccountIcon>
                    <ExportIcon/> EXPORT
                  </AccountIcon>
                  <AccountIcon>
                    <EditIcon/> EDIT
                  </AccountIcon>
                  <AccountIcon>
                    <DeleteIcon/> DELETE
                  </AccountIcon>
                </Flex>
              </Info>

              <TransactionInfo>
                <Flex full >
                  <FlexItem>
                    <Transactions >
                      TRANSACTIONS
                    </Transactions>
                    <Flex>
                      {/* <FlexItem>
                        <TransactionsData >
                          ID
                        </TransactionsData>
                      </FlexItem>
                      <FlexItem>
                        <TransactionsData >
                          Confirmations
                        </TransactionsData>
                      </FlexItem>
                      <FlexItem>
                        <TransactionsData >
                          Date
                        </TransactionsData>
                      </FlexItem>
                      <FlexItem>               
                        <TransactionsData >
                          From
                        </TransactionsData>
                      </FlexItem>
                      <FlexItem>
                        <TransactionsData >
                          To
                        </TransactionsData>
                      </FlexItem> */}
                      <FlexItem>
                        <TransactionsData >
                          ID
                        </TransactionsData>
                        <TransactionsData >
                          Confirmations
                        </TransactionsData>
                        <TransactionsData >
                          Date
                        </TransactionsData>           
                        <TransactionsData >
                          From
                        </TransactionsData>
                        <TransactionsData >
                          To
                        </TransactionsData>
                      </FlexItem>
                    </Flex>
                    
                    {/* transaction data */}
                    <Flex>
                      {/* <FlexItem>
                        <TransactionsData >
                          id
                        </TransactionsData>
                      </FlexItem>
                      <FlexItem>
                        <TransactionsData >
                          confirmations
                        </TransactionsData>
                      </FlexItem>
                      <FlexItem>
                        <TransactionsData >
                          date
                        </TransactionsData>
                      </FlexItem>
                      <FlexItem>
                        <TransactionsData >
                          from
                        </TransactionsData>
                      </FlexItem>
                      <FlexItem>
                        <TransactionsData >
                          to
                        </TransactionsData>
                      </FlexItem> */}
                    </Flex>
                  </FlexItem>
                </Flex>
              </TransactionInfo>

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