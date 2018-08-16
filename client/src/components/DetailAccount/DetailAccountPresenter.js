import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import ModalHeader from 'components/AddressHeader';
import ReactModal from 'react-modal';
import QRCode from 'qrcode-react';
import { Copy } from "styled-icons/feather/Copy";
import { Send } from "styled-icons/feather/Send";
import { Download } from "styled-icons/feather/Download";
import { Lock } from "styled-icons/feather/Lock";
import { Edit2 } from "styled-icons/feather/Edit2";
import { Delete } from "styled-icons/material/Delete";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CheckCircle } from 'styled-icons/feather/CheckCircle';
import yeed from 'assets/images/yeed-symbol.png';
import { Yeed, Button } from "components/Shared";
import {
  Tooltip,
  TooltipArrow,
  TooltipInner,
} from 'styled-tooltip-component';
import {
  Table
} from 'styled-table-component';
import Store from "context/store";
const accountProp = "account"
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
  width: ${props => (props.edit ? "inherit" : "105px;")}
  height: ${props => (props.edit ? "inherit" : "40px;")}
  justify-content: center;
  background-color: #ffffff;
  align-items: center;
  border-radius: 10px;
  margin-top: ${props => (props.edit ? "14px" : "10px;")}
  margin-left:${props => (props.edit ? "5px" : "40px")}
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
  color: black;
`
const DeleteIcon = styled(Delete)`
  width:20px;
  margin-right:5px;
  color: black;
`
const LockIcon = styled(Lock)`
  width:20px;
  margin-right:5px;
  color: black;
`
const CheckIcon = styled(CheckCircle)`
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
  align-items: center;
  margin-top: 10px;
  margin-right: 50px;
  margin-bottom: 10px;
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
    border-bottom: 0.1px solid rgb(051,153,051);
  }
  &:active {
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
const Label = styled.div`
  margin-top:15px;
  margin-left:20px;
  font-size:1.3em;
  font-weight:400;
`;
const QR = styled.div`
  margin-top:10px;
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
const Submit = styled.input`
  border: 0;
  padding: 10px 0;
  border-bottom: 0.2px solid rgb(051,153,051);
  &:focus,
  &:active {
    outline: none;
  }
  &:disabled{
      color:#999;
      border: 2px solid #999;
      cursor:not-allowed;
      transform: none;
      box-shadow:none;
      &:focus,
      &:active,
      &:hover {
        transform: none;
      }
  }
`;
const Input = Submit.extend`
  width: 30%;
  height: 40px;
  font-size: 0.9em;
  margin-left:20px;
  padding-left: 10px;
  margin-top:${props => (props.amountInput ? "10px" : "")}
`;

const DetailAccountPresenter = ({copy, copied, copyHidden, handleTooltip, top, left, edit, handleInput, name, editor}) => (
  <Flex>
  <Store.Consumer>
    {store => (
      <Modal
        isOpen={store.showAccountModal}
        style={{
          content: {
            color: 'black'
          }
        }}
      >
      <ModalHeader myAccount/>
        <Info>
          <Flex full >
            <FlexItem>
              <QR>
                <QRCode value={store.selectAddress} />
              </QR>
            </FlexItem>
            <FlexItem>
              <Flex>
                {editor 
                ? 
                <Input
                  placeholder={store.selectName}
                  required
                  name="name"
                  value={name}
                  type={"text"}
                  onChange={handleInput}
                />
                : 
                <Label>
                  {store.selectName}
                </Label>
                }           
                <AccountIcon edit
                  onClick={() => edit(store.selectAddress)}
                >
                  {editor ? <CheckIcon/> : <EditIcon/> }
                </AccountIcon>
              </Flex>
              <CopyToClipboard text={store.selectAddress}
              >
                <DetailAddress
                  onMouseEnter={(ev) => handleTooltip(ev, false,"")}
                  onMouseLeave={(ev) => handleTooltip(ev, true,"")}
                  onClick={() => copy()}
                >
                  <AddressCopyIcon/>
                  {store.selectAddress}
                </DetailAddress>
              </CopyToClipboard>
              <Tooltip
                hidden={copyHidden}
                style={{
                  top: `${top}px`,
                  left: `${left}px`
                }}
                left
              >
                <TooltipArrow right={true} />
                <TooltipInner left>{copied===true ? "Copied" : "Copy"}</TooltipInner>
              </Tooltip>
              <Flex>
                <Balance>Balance </Balance>
                <Yeed><img src={yeed} alt="yeed" /></Yeed>
                <Balance val>0</Balance>
              </Flex>
            </FlexItem>
          </Flex>
          <Flex full>
            <AccountIcon first
              onClick={() => store.DetailAccountMenuModal()}
            >
              <TransactionIcon/> TRANSFER
            </AccountIcon>
            <AccountIcon>
              <ExportIcon/> EXPORT
            </AccountIcon>
            <AccountIcon>
              <LockIcon/> PASSWORD
            </AccountIcon>
            <AccountIcon
              onClick={() => store.DetailAccountMenuModal()}
            >
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
              {/* <Transactions >
                EXCHANGE
              </Transactions>
              <Transactions >
                CONTRACT
              </Transactions> */}
              <Flex>
              <Table hover width={"1200px"} ml={"15px"}>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Confirmations</th>
                      <th scope="col">Date</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                    </tr>
                  </tbody>
                </Table>
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
    )}
    </Store.Consumer>
  </Flex>
);

DetailAccountPresenter.propTypes = {
  selectAddress: PropTypes.string,
  handleTooltip: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

ReactModal.setAppElement('body');
export default DetailAccountPresenter;
