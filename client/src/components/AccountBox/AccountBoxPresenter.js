import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import ReactModal from 'react-modal';
import yeed from 'assets/images/yeed-symbol.png';
import ModalHeader from 'components/AccountBoxHeader';
import { Yeed, Line } from "components/Shared";
import { Download } from 'styled-icons/feather/Download';
import { PersonAdd } from 'styled-icons/material/PersonAdd';
import { Button } from 'components/Shared';
import { UserLock } from "styled-icons/fa-solid/UserLock";
import Store from "context/store";
import Account from "components/Address";
import germinal from 'assets/images/ygg_symbol_shadow.png';

const AccountBox = styled.div`
  background-color: #ffffff;
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  width: 50%;
  height: 270px;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 40px;
  box-sizing: border-box;
  border: 2px solid rgba(0,0,0,.0975);
  overflow:scroll;
`;

const Germinal = styled.div`
  width:50px;
`;

const Title = styled.span`
  font-weight: 400;
  display: flex;
  font-size: 1.3em;
  margin-left: 10px;
`;

const ImportAccountIcon = styled(Download)`
  width: 20px;
  margin-right:7px;
`
const CreateAccountIcon = styled(PersonAdd)`
  width: 20px;
  margin-right:7px;
`
const LockIconIcon = styled(UserLock)`
  width: 15px;
  margin-right:7px;
`
const YeedAnimation = styled.div`
  width: 60px;
  margin 0 auto;
  padding-top: 25px;
  animation: App-logo-spin infinite 20s linear;
  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Modal = styled(ReactModal)`
  border: 0;
  width: 50%;
  position: absolute;
  top: 30%;
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
    -webkit-animation-duration: 0.3ss;
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

const Info = styled.div`
  width: 90%;
  height: ${props => (props.mnemonic ? "40px;" : "80px;")};
  border: 0;
  border-radius: 5px;
  border-bottom: 0.2px solid ${props => (props.mnemonic ?"rgb(051,153,051);" : "inherit")}
  background-color: ${props => (props.mnemonic ?  "#fafafa;" : "#ffffff;")};
  color: ${props => (props.mnemonic || props.confirm ?  "inherit" : "#EA2027;")};
  box-shadow: ${props => (props.mnemonic ?  "inherit" : "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);")}
  transition: all 0.1s linear;
  text-align: ${props => (props.mnemonic ? "left;" : "center;")};
  margin:0 auto;
  font-weight: 350;
  font-size: ${props => (props.mnemonic ? "1em;" : "1.1em;")};
  padding-left: ${props => (props.mnemonic ? "10px" : "inherit")};
  padding-top: ${props => {
    if (props.mnemonic) {
      return "10px";
    } else if (props.confirm) {
      return "30px";
    } else {
      return "12px";
    }
  }};
`;

const Passphrase = styled.div`
  margin-top: 50px;
  margin-left:40px;
  margin-bottom: 30px;
  transition: all 0.1s linear;
  color: black;
`;

const AlertInfo = styled.div`
  margin-top:20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1em;
  font-weight: 400;
  transition: all 0.1s linear;
  color:#EA2027;
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
`;

const Confirm = styled.input`
  border: 0;
  margin-right:10px;
  padding: 10px 0;
  background-color:  #FAFAFA;
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

const ConfirmInput = Confirm.extend`
  width: 15%;
  height: 40px;
  font-size: 0.9em;
  margin-left:40px;
  text-align:center;
`;


const AccountBoxPresenter = ({ text, balance, mnemonic, importMnemonic, AlertImportAccount, word3, word6, word9 }) => (
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
                  onClick={() => store.importAccountModal()}
                >
                <ImportAccountIcon/>
                IMPORT ACCOUNT
                </Button>
                <Button
                  onClick={() => store.createAccountModal()}
                >
                <CreateAccountIcon/>
                CREATE ACCOUNT
                </Button>

                <Modal
                  isOpen={store.showModal}
                  style={{
                    content: {
                      color: 'black'
                    }
                  }}
                >
                  <ModalHeader/>
                  <FlexItem>
                    <Info confirm={store.statusModal === "confirm"}>
                      { store.statusModal === "create" ? `Before proceeding further, first BACKUP THE PASSPHRASE SECURELY, this client does NOT store it and thus cannot recover your passphrase! If you lose it, delete it, or it gets stolen - we CANNOT help you recover it. There is no forgot my passphrase option!` : ``}
                      { store.statusModal === "confirm" ? `Please type word 3, 6 and 9 from your passphrase to validate the account creation.` : "" }
                      { store.statusModal === "import" ? `Passphrase is case sensitive, each character change will result in importing a different Yggdrash address! Passphrases are not saved on this computer so always make sure you have them backed up safely!` : ``}
                    </Info>
                  </FlexItem>
                  <FlexItem>
                    <Passphrase>
                      <LockIconIcon/>Passphrase
                    </Passphrase>
                  </FlexItem>
                  <FlexItem>
                    {
                      store.statusModal === "create"
                      ?
                      <Info mnemonic>
                        {mnemonic}
                      </Info>
                      :
                      ""
                    }
                    { store.statusModal === "confirm" 
                    ? 
                    <FlexItem>
                      <ConfirmInput AlertImportAccount={ AlertImportAccount }
                        placeholder={"Word3"}
                        required
                        maxLength={20}
                        name="word3"
                        value={word3}
                        type={"text"}
                        onChange={store.handleInput}
                      />
                      <ConfirmInput AlertImportAccount={ AlertImportAccount }
                        placeholder={"Word6"}
                        required
                        maxLength={20}
                        name="word6"
                        value={word6}
                        type={"text"}
                        onChange={store.handleInput}
                      />
                      <ConfirmInput AlertImportAccount={ AlertImportAccount }
                        placeholder={"Word9"}
                        required
                        maxLength={20}
                        name="word9"
                        value={word9}
                        type={"text"}
                        onChange={store.handleInput}
                      />
                    </FlexItem>
                    : 
                    "" 
                    }
                    { store.statusModal === "import" 
                    ? 
                    <Input AlertImportAccount={ AlertImportAccount }
                        placeholder={"PASSPHRASE"}
                        required
                        maxLength={130}
                        name="importMnemonic"
                        value={importMnemonic}
                        type={"text"}
                        onChange={store.handleInput}
                      /> 
                      : 
                      "" 
                      }
                  </FlexItem>
                  <FlexItem>
                    <AlertInfo>
                      { AlertImportAccount }
                    </AlertInfo>
                  </FlexItem>
                  <Flex alignCenter justifyBetween>
                    <FlexItem>
                      <Fragment/>
                    </FlexItem>
                    <FlexItem>
                      <Fragment>
                      <Button 
                          onClick={() => {
                            if(store.statusModal === "confirm"){
                              store.createAccount() 
                             }else if(store.statusModal === "import"){
                              store.importAccount()
                             }else if(store.statusModal === "create"){
                              store.confirmCreateAccount()
                             }
                            }}
                          >
                          {store.statusModal === "create"  ? `NEXT` : ``}
                          {store.statusModal === "confirm"  ? `CREATE` : ``}
                          {store.statusModal === "import"  ? `IMPORT` : ``}
                        </Button>
                        <Button 
                          onClick={() => store.closeModal()}>
                          CANCLE
                        </Button>
                      </Fragment>
                    </FlexItem>
                  </Flex>
                </Modal>
              </Fragment>
            )}
          </Store.Consumer>
        </Fragment>
      </FlexItem>
    </Flex>
    <Line second/>
    <Store.Consumer>
        {store => (
          store.address.length === 0 ? <YeedAnimation><img src={germinal} alt="germinal" /></YeedAnimation> : ""
        )}
    </Store.Consumer>
    <Store.Consumer>
          {store => {
            return store.address.map(key => (
              <Account
                address={key}
              />
            ));
          }}
      </Store.Consumer>
  </AccountBox>
);

AccountBoxPresenter.propTypes = {
  text: PropTypes.string.isRequired,
  balance: PropTypes.string,
  id: PropTypes.number.isRequired,
  importMnemonic: PropTypes.string
};

ReactModal.setAppElement('body');

export default AccountBoxPresenter;
