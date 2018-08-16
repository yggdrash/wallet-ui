import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import ModalHeader from 'components/AddressHeader';
import ReactModal from 'react-modal';
import { Button } from "components/Shared";
import Store from "context/store";

const txProp = "transfer"
const Transfer = styled(ReactModal)`
  border: 0;
  width: 50%;
  position: absolute;
  top: 30%
  left: 25%;
  background-color: #FAFAFA;
  background-image: url('../assets/images/how-bg-opti.png');
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
const SendTxForm = styled.form`
  margin-top: 25px;
`;
const Submit = styled.input`
  border: 0;
  margin-right:10px;
  padding: 10px 0;
  background-color: #FAFAFA;
  border-bottom: 0.2px solid ${props => (props.AlertImportAccount ?"rgb(204,000,000);" : "rgb(051,153,051);")}
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
  width: 90%;
  height: 40px;
  font-size: 0.9em;
  margin-left:40px;
  padding-left: 10px;
  margin-top:${props => (props.amountInput ? "10px" : "")}
`;

const DetailAccountMenuPresenter = ({ balace }) => (
  <Flex>
  <Store.Consumer>
    {store => (
        <Transfer
        isOpen={store.showDetailAccountMenuModal}
        style={{
          content: {
            color: 'black'
          }
        }}
      >
      <ModalHeader/>  
      <SendTxForm onSubmit={store.handleSubmit}>
        <Input
          placeholder={"Address"}
          required
          name="toAddress"
          value={store.toAddress}
          type={"text"}
          onChange={store.handleInput}
        />
        <Input amountInput
          placeholder={"Amount"}
          required
          name="amount"
          type={"number"}
          value={store.amount}
          onChange={store.handleInput}
          max={store.balance}
        />
      </SendTxForm>
        <Flex alignCenter justifyBetween>
          <FlexItem>
            <Fragment/>
          </FlexItem>
          <FlexItem>
            <Fragment>
              <Button 
                onClick={() => store.closeModal(txProp)}
              >
                SEND
              </Button>
            </Fragment>
            <Fragment>
              <Button 
                onClick={() => store.closeModal(txProp)}>
                CLOSE
              </Button>
            </Fragment>
          </FlexItem>
        </Flex>
      </Transfer>
    )}
    </Store.Consumer>
  </Flex>
);

DetailAccountMenuPresenter.propTypes = {
  handleInput: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  toAddress: PropTypes.string,
  amount: PropTypes.string
};

ReactModal.setAppElement('body');
export default DetailAccountMenuPresenter;
