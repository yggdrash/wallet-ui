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
import { Check } from 'styled-icons/material/Check';
import { Button } from "components/Shared";
import DetailAccountMenu from 'components/DetailAccountMenu';
import back from "assets/images/back4.jpg";
import txReceipt from 'components/txReceipt';
import {
  Tooltip,
  TooltipArrow,
  TooltipInner,
} from 'styled-tooltip-component';
import Store from "context/store";
const accountProp = "account"
const Container = styled.div`
`;
const Modal = styled(ReactModal)`
  border: 0;
  // background-color: rgba( 22, 48, 72, 0.95 );
  background-image: url(${back});
  background-repeat: no-repeat
  background-size: cover;
  width: 90%;
  height: 90%;
  position: absolute;
  top: 5%
  left: 5%;
  border: 2px solid rgba(0,0,0,.0975);
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  box-sizing: border-box;
  border-color: rgba(70, 219, 115, 0);
  &:focus,
  &:active {
    outline: none;
  }
  -webkit-animation-name: zoom;
    -webkit-animation-duration: 0.4s;
    animation-name: zoom;
    animation-duration: 0.4s;
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
  background: transparent
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
  color:white
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    transform: translateY(-3px);
    color: #DCB830
  }
  &:active {
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
const AccountIcon = styled.button`
  border: 0;
  width: ${props => (props.edit ? "inherit" : "105px;")}
  height: ${props => (props.edit ? "inherit" : "40px;")}
  justify-content: center;
  background: transparent
  align-items: center;
  border-radius: 10px;
  margin-top: ${props => (props.edit ? "14px" : "10px;")}
  margin-left:${props => (props.edit ? "5px" : "40px")}
  cursor: pointer;
  color: #fcfcfc
  transition: all 0.2s ease-out;
  position: relative;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    // box-shadow: ${props => (props.edit ? "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);" : "inherit")}
    transform: translateY(-3px);
    color: #DCB830
  }
  &:active {
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
const AddressCopyIcon = styled(Copy)`
  width:20px;
  margin-right:5px;
`
const EditIcon = styled(Edit2)`
  width:20px;
`
const CheckIcon = styled(Check)`
  width:20px;
  margin-right:5px;
`
const TransactionIcon = styled(Send)`
  width:20px;
  margin-right:5px;
  color: white;
`
const ExportIcon = styled(Download)`
  width:20px;
  margin-right:5px;
  color: white;
`
const DeleteIcon = styled(Delete)`
  width:20px;
  margin-right:5px;
  color: white;
`
const LockIcon = styled(Lock)`
  width:20px;
  margin-right:5px;
  color:white;
`

const Info = styled.div`
  width: 90%;
  height: 150px;
  margin-top: 40px;
  margin-left: 65px;
  border: 0;
  border-radius: 15px;
  background-color: rgba( 255, 255, 255, 0.4);
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
  border-radius: 15px;
  background-color: rgba( 255, 255, 255, 0.4);
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
  background: transparent
  align-items: center;
  margin-top: 10px;
  margin-right: 50px;
  margin-bottom: 10px;
  margin-left: ${props => (props.first ? "15px;": "inherit")}
  font-size:1.1em;
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
  color:white;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    transform: translateY(-1px);
    border-bottom: 0.1px solid rgb(0,0,0);
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
  color:white
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
      return "7px"
    } else if(props.accountBox ){
      return "5px"
    } else {
      return "25px"
    }
  }}
  color: ${props => {
    if(props.accountBox){
      return "#fcfcfc;"
    } else if(props.val){
      return "white"
    } else {
      return "white"
    }
  }}
`;
const Submit = styled.input`
  border: 0;
  padding: 10px 0;
  background: transparent
  border-bottom: 0.2px solid rgb(0,0,0);
  &::-webkit-input-value {
    color: #dfe6e9
  }
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
const TransactionData = styled.button`
  width: 95%;
  height:50px;
  border:0;
  border-bottom: 1px solid rgb(255,255,255);
  background-color:transparent
  font-size: 0.9em;
  font-weight: 250;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
  padding-left:20px;
  display: flex;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    transform: translateY(-3px);
    border-bottom: 1px solid rgb(255,204,0)
  }
  &:active {
    transform: translateY(3px);
  }
`;
const TxID = styled.div`
    color:#fcfcfc
`;
const TxReceipt = styled(ReactModal)`
  border: 0;
  width: 50%;
  position: absolute;
  top: 30%
  left: 25%;
  background-color: rgba( 22, 48, 72, 0.7 );
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
    -webkit-animation-duration: 0.3s;
    animation-name: zoom;
    animation-duration: 0.3s;
  @-webkit-keyframes zoom {
      from {-webkit-transform:scale(0)} 
      to {-webkit-transform:scale(1)}
  }
  
  @keyframes zoom {
      from {transform:scale(0)} 
      to {transform:scale(1)}
  }
`
const Header = styled.header`
  height: 60px;
  background-color:transparent
  padding: 0 40px;
  border-bottom: 1px solid rgba(255,255,255,0.7);
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  margin-bottom:30px;
  font-size: 1.5em;
  font-weight: 700;
`;

const HeaderTitle = styled.div`
  color: #fcfcfc
  font-style:italic;
  font-family: 'Titillium Web', sans-serif
`;

const DetailAccountPresenter = ({copy, copied, copyHidden, handleTooltip, top, left, balance, txResult, txReceipt, txReceiptOpen, close}) => (
  <Container>
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
                {store.editor 
                ? 
                <Input
                  placeholder={store.selectName}
                  required
                  name="selectName"
                  value={store.selectName}
                  type={"text"}
                  maxLength={30}
                  onChange={store.handleInput}
                />
                : 
                <Label>
                  {store.selectName}
                </Label>
                }           
                <AccountIcon edit
                  onClick={() => store.edit(store.selectAddress)}
                >
                  {store.editor ? <CheckIcon/> : <EditIcon/> }
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
                <Balance>Balance :</Balance>
                {/* <Yeed><img src={yeed} alt="yeed" /></Yeed> */}
                <Balance val>{balance} YEED</Balance>
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
          <Flex full column>
            <FlexItem>
              <Transactions first>
                TRANSACTIONS
              </Transactions>
              {/* <Transactions >
                EXCHANGE
              </Transactions>
              <Transactions >
                CONTRACT
              </Transactions> */}
            </FlexItem>
            <FlexItem>
              <TransactionData
                onClick={() => store.getTransactionReceipt(txResult)}
              >
              {
                txResult 
                ?
                <TxID>
                  TX ID : {txResult}
                </TxID>
                :
                ""
              }
              </TransactionData>
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
    <Store.Consumer>
    {store => (
      <Flex>
        <DetailAccountMenu
          lowdb={store.lowdb}
        />
      </Flex>
    )}
   </Store.Consumer>
  
      <Flex>
        <txReceipt/>
      </Flex>

  </Container>
);

DetailAccountPresenter.propTypes = {
  selectAddress: PropTypes.string,
  handleTooltip: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

ReactModal.setAppElement('body');
export default DetailAccountPresenter;
