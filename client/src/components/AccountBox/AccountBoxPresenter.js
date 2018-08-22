import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import ReactModal from 'react-modal';
import ModalHeader from 'components/AccountBoxHeader';
import { Line } from "components/Shared";
import { Download } from 'styled-icons/feather/Download';
import { PersonAdd } from 'styled-icons/material/PersonAdd';
import { Button } from 'components/Shared';
import { UserLock } from "styled-icons/fa-solid/UserLock";
import Store from "context/store";
import Account from "components/Address";
import ygg from 'assets/images/YGG_logo.png';
import DetailAccount from 'components/DetailAccount';
// import LoadingScreen from 'react-loading-screen';

const mainModalProp = "main"
const AccountBox = styled.div`
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  background-color: rgba( 18, 38, 57, 0.35);
  width: 65%;
  height: 400px;
  border-radius: 15px;
  margin-bottom: 70px;
  box-sizing: border-box;
  border: 2px solid rgba(0,0,0,.0975);
  overflow:scroll;
`;
const Title = styled.span`
  color: #fcfcfc
  margin-top:15px;
  font-weight: 400;
  display: flex;
  font-size: 1.3em;
  font-weight: 500;
  margin-left:20px;
  margin-bottom:20px;
  font-style: italic;
  font-family: 'Roboto', sans-serif
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
  width: 300px;
  opacity:0.3;
  margin 0 auto;
  padding-top: 90px;
`;
const Modal = styled(ReactModal)`
  border: 0;
  width: 50%;
  position: absolute;
  top: ${props => (props.import ? "20%" : "25%")}
  left: 25%;
  background-color: rgba( 22, 48, 72, 0.95 );
  // background-color: rgba( 49, 49, 49, 0.9 );
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
const Info = styled.div`
  width: 90%;
  height: ${props => (props.mnemonic ? "40px;" : "80px;")};
  border: 0;
  border-radius: ${props => (props.mnemonic ? "inherit" : "5px;")}
  border-bottom: 0.2px solid ${props => (props.mnemonic ? "rgb(75,203,188);" : "inherit")}
  background-color: ${props => (props.mnemonic ? "inherit" : "rgba( 22, 48, 72, 0.95 );")}
  color: ${props => (props.mnemonic || props.confirm ?  "white" : "#E35B5B;")};
  box-shadow: ${props => (props.mnemonic ? "inherit" : "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);")}
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
const PasswordStrength = styled.div`
  width: 90%;
  height: 5px;
  border: 0;
  background-color: #ffffff;
  color: #EA2027;
  transition: all 0.1s linear;
  text-align: left;
  margin:0 auto;
`;
const PasswordStrengthMeter = styled.div`
  width: ${props => {
    if (props.red) {
      return "30%";
    } else if (props.yellow) {
      return "50%";
    } else if (props.blue) {
      return "70%";
    } else if (props.green) {
      return "100%";
    } else {
      return "20%";
    }
  }};
  height: 5px;
  border: 0;
  background-color: ${props => {
    if (props.red) {
      return "#f0932b";
    } else if (props.yellow) {
      return "#badc58";
    } else if (props.blue) {
      return "#22a6b3";
    } else if (props.green) {
      return "#6ab04c";
    } else {
      return "red";
    }
  }};
  transition: all 0.1s linear;
  text-align: left;
`;
const Passphrase = styled.div`
  margin-top: ${props => (props.descriptive ? "20px;" : "50px;")};
  margin-left:40px;
  margin-bottom: ${props => (props.descriptive ? "10px;" : "30px;")};
  font-size: ${props => (props.descriptive ? "0.7em" : "inherit")};
  transition: all 0.1s linear;
  color: white;
`;
const AlertInfo = styled.div`
  margin-top:20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1em;
  font-weight: 400;
  transition: all 0.1s linear;
  color:#E35B5B;
`;

const Submit = styled.input`
  border: 0;
  margin-right:10px;
  padding: 10px 0;
  color:${props => {
    if (props.AlertImportAccount || props.descriptive || props.AlertImportAccountName || props.AlertImportAccountPass || props.AlertImportAccountConfirmPass) {
      return "rgb(204,000,000);";
    } else {
      return "";
    }
  }};
  background-color:transparent
  border-bottom: 0.2px solid ${props => {
    if (props.AlertImportAccount || props.descriptive || props.AlertImportAccountName || props.AlertImportAccountPass || props.AlertImportAccountConfirmPass) {
      return "rgb(204,000,000);";
    } else if(props.descriptive===false || props.accountName || props.password || props.confirmPassword|| props.word3 || props.word6 || props.word9 || props.importMnemonic) {
      return "rgb(75,203,188);";
    } else {
      return "";
    }
  }};
  &::-webkit-input-placeholder {
    color: #dfe6e9
  }
  &:focus,
  &:active {
    outline: none;
  }
  &:after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width .3s;
  }
  &:hover {
    width: ${props => {
      if (props.confirm) {
        return "15%;";
      }else {
        return "90%;";
      }
    }};
    border-bottom: 0.2px solid ${props => {
      if (props.AlertImportAccount || props.descriptive || props.AlertImportAccountName || props.AlertImportAccountPass || props.AlertImportAccountConfirmPass) {
        return "rgb(204,000,000);";
      } else {
        return "rgb(75,203,188);";
      }
    }};
  }
`;
const Input = Submit.extend`
  width: ${props => {
    if (props.confirm) {
      return "15%;";
    }else {
      return "90%;";
    }
  }};
  height: 40px;
  font-size: 0.9em;
  margin-left:40px;
  padding-left: 10px;
  color:white;
`;

const Loading = styled.div`
  position: absolute;
  top: calc(50% - 4em);
  left: calc(50% - 4em);
  width: 6em;
  height: 6em;
  border: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid #000000;
  border-radius: 50%;
  animation: load8 1.1s infinite linear;
  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Address = styled.div`
  display: ${props => (props.first ? "inherit" : "grid")}
  grid-template-columns: ${props => {
    if (props.first) {
      return "inherit";
    }else if(props.second){
      return "490px 490px"
    }else {
      return "330px 330px 330px";
    }
  }};
`;


const AccountBoxPresenter = ({ 
  balance, 
  mnemonic, 
  importMnemonic, 
  AlertImportAccount, 
  word3, 
  word6, 
  word9, 
  recoveryPharse, 
  accountName, 
  password, 
  confirmPassword, 
  AlertImportAccountName, 
  AlertImportAccountPass, 
  AlertImportAccountConfirmPass, 
  isloading, 
  passwordValid 
}) => (
  <AccountBox >
    <Flex alignCenter justifyBetween>
      <Title>
        MY ACCOUNTS
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
                  importAccount
                  onClick={() => store.importAccountModal()}
                >
                <ImportAccountIcon/>
                IMPORT
                </Button>
                <Button
                  createAccount
                  onClick={() => store.createAccountModal()}
                >
                <CreateAccountIcon/>
                CREATE
                </Button>

                <Modal
                  oncopy={"false"}
                  import={store.statusModal==="import"}
                  isOpen={store.showModal}
                  style={{
                    content: {
                      color: 'black'
                    }
                  }}
                >
                  {/* <LoadingScreen
                    loading={isloading}
                    bgColor='#f1f1f1'
                    spinnerColor='#9ee5f8'
                    textColor='#676767'
                    logoSrc={yeed}
                    text='Here an introduction sentence (Optional)'
                  > 
                  </LoadingScreen> */}
                  { isloading ? <Loading/>: ""}
                  <ModalHeader/>
                  <FlexItem>
                    {
                      store.statusModal === "password" || store.statusModal === "import"
                      ?
                      <Fragment>
                        <Passphrase descriptive>account name</Passphrase>
                        <Input AlertImportAccountName={ AlertImportAccountName } accountName={ accountName }
                            placeholder={"a descriptive name for the account"}
                            required
                            maxLength={130}
                            name="accountName"
                            value={accountName}
                            type={"text"}
                            onChange={store.handleInput}
                        />
                        <Passphrase descriptive>password</Passphrase>
                        <Input AlertImportAccountPass={ AlertImportAccountPass } password={ password }
                            placeholder={"a strong, unique password"}
                            required
                            maxLength={30}
                            name="password"
                            value={password}
                            type={"password"}
                            onChange={store.handleInput}
                        />
                        <Passphrase descriptive>password(repeat)</Passphrase>
                        <Input AlertImportAccountConfirmPass={ AlertImportAccountConfirmPass } confirmPassword={ confirmPassword }
                            placeholder={"verify your password"}
                            required
                            maxLength={30}
                            name="confirmPassword"
                            value={confirmPassword}
                            type={"password"}
                            onChange={store.handleInput}
                        />
                        <Passphrase descriptive>password strength</Passphrase>
                        <PasswordStrength>
                          <PasswordStrengthMeter
                            defalt = { passwordValid === "defalt" }
                            red = { passwordValid === "red" }
                            yellow = { passwordValid === "yellow" }
                            blue = { passwordValid === "blue" }
                            green = { passwordValid === "green" }
                          />
                        </PasswordStrength>
                        <Passphrase descriptive>Use a few words, avoid common phrases No need for symbols, digits, or uppercase letters</Passphrase>
                      </Fragment>
                      :
                      ""
                    }
                    { 
                      store.statusModal === "create" 
                      ? 
                      <Info confirm={store.statusModal === "confirm"}>
                        Before proceeding further, first BACKUP THE PASSPHRASE SECURELY, this client does NOT store it and thus cannot recover your passphrase! If you lose it, delete it, or it gets stolen - we CANNOT help you recover it. There is no forgot my passphrase option!
                      </Info>
                      :
                      ""
                    }
                    { 
                      store.statusModal === "confirm" 
                      ? 
                      <Info confirm={store.statusModal === "confirm"}>
                        Please type word 3, 6 and 9 from your passphrase to validate the account creation.
                      </Info>
                      :
                      ""
                    }
                  </FlexItem>
                  <FlexItem>
                    {
                      store.statusModal === "password"
                      ?
                      ""
                      : 
                      <Passphrase>
                        <LockIconIcon/>Passphrase
                      </Passphrase>
                    }
                  </FlexItem>
                  <FlexItem>
                    {
                      store.statusModal === "create"
                      ?
                      <Fragment>
                        <Info mnemonic>
                          {mnemonic}
                        </Info>
                        <Passphrase descriptive>Type "I have written down the pharse" below to confirm it is backed up.</Passphrase>
                        <Input descriptive={store.confirmRecoveryPharse} AlertImportAccount={ AlertImportAccount }
                          placeholder={"the account recovery phrase"}
                          required
                          maxLength={130}
                          name="recoveryPharse"
                          value={recoveryPharse}
                          type={"text"}
                          onChange={store.handleInput}
                        />
                      </Fragment> 
                      :
                      ""
                    }
                    { store.statusModal === "confirm" 
                    ? 
                    <FlexItem>
                      <Input confirm AlertImportAccount={ AlertImportAccount } word3={ word3 }
                        placeholder={"Word3"}
                        required
                        maxLength={20}
                        name="word3"
                        value={word3}
                        type={"text"}
                        onChange={store.handleInput}
                      />
                      <Input confirm AlertImportAccount={ AlertImportAccount } word6={ word6 }
                        placeholder={"Word6"}
                        required
                        maxLength={20}
                        name="word6"
                        value={word6}
                        type={"text"}
                        onChange={store.handleInput}
                      />
                      <Input confirm AlertImportAccount={ AlertImportAccount } word9={ word9 }
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
                    <Input AlertImportAccount={ AlertImportAccount } importMnemonic={ importMnemonic }
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
                      { AlertImportAccountName }
                      { AlertImportAccountPass }
                      { AlertImportAccountConfirmPass }
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
                            if(store.statusModal === "password"){
                              store.setPassword() 
                            }else if(store.statusModal === "create"){
                              store.generationMnemonic() 
                            }else if(store.statusModal === "confirm"){
                              store.createAccount()
                            }else if(store.statusModal === "import"){
                              store.importAccount()
                            }
                          }}
                        >
                          {store.statusModal === "password" ? `NEXT` : ``}
                          {store.statusModal === "create" ? `NEXT` : ``}
                          {store.statusModal === "confirm"  ? `CREATE` : ``}
                          {store.statusModal === "import"  ? `IMPORT` : ``}
                        </Button>
                        <Button 
                          onClick={() => store.closeModal(mainModalProp)}>
                          CANCLE
                        </Button>
                      </Fragment>
                    </FlexItem>
                  </Flex>
                </Modal>
                <DetailAccount
                
                />
              </Fragment>
            )}
          </Store.Consumer>
        </Fragment>
      </FlexItem>
    </Flex>
    <Line second/>
    <Store.Consumer>
        {store => (
          store.lowdb.get("accounts").map("address").value().length === 0 ? <YeedAnimation><img src={ygg} alt="germinal" /></YeedAnimation> : ""
        )}
    </Store.Consumer>
    <Store.Consumer>
      {store => (
        <Address
        first={store.lowdb.get("accounts").map("address").value().length === 1}
        second={store.lowdb.get("accounts").map("address").value().length ===2}
        >
          <Store.Consumer>
              {store => {
                return store.lowdb.get("accounts").map("address").value().map(addr => (
                  <Account
                    address={addr}
                    name={store.lowdb.get("accounts").find({address:addr}).value().name}
                    lowdb={store.lowdb}
                  />
                ));
              }}
          </Store.Consumer>
        </Address>
      )}
    </Store.Consumer>
  </AccountBox>
);

AccountBoxPresenter.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  createAccount: PropTypes.func.isRequired,
  createAccountModal: PropTypes.func.isRequired,
  importAccountModal: PropTypes.func.isRequired,
  importAccount: PropTypes.func.isRequired,
  generationMnemonic: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  password: PropTypes.string,
  balance: PropTypes.string,
  importMnemonic: PropTypes.string,
  toAddress: PropTypes.string,
  amount: PropTypes.string,
  selectAddress: PropTypes.string
};

ReactModal.setAppElement('body');

export default AccountBoxPresenter;
