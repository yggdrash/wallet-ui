import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import ReactModal from 'react-modal';
import yeed from 'assets/images/yeed-symbol.png';
import ModalHeader from 'components/ModalHeader';
import { Yeed } from "components/Shared";
import { Download } from 'styled-icons/feather/Download';
import { PersonAdd } from 'styled-icons/material/PersonAdd';
import { Button } from 'components/Shared';
import { AddAlert } from "styled-icons/material/AddAlert";
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

const Account = styled.button`
  width: 100%;
  border: 0;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
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

const Title = styled.span`
  font-weight: 400;
  display: flex;
  font-size: 1.3em;
  margin-left: 10px;
`;

const Line = styled.div`
  border-bottom: 0.1px solid rgb(105,105,105);
  width: 100%;
  margin-top: ${props => (props.second ? "15px;" : "inherit")};
`;

const Address = styled.span`
  font-weight: 400;
  font-size: 1.3em;
  width: 100%;
  display: flex;
`;

const Balance = styled.div`
  font-weight: 300;
  font-size: 1.1em;
  margin-top: ${props => (props.yeed ? "26px;" : "inherit")};
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

const AlertIcon = styled(AddAlert)`
  width: 20px;
  margin-right:7px;
`

const Modal = styled(ReactModal)`
  border: 0;
  width: 50%;
  position: absolute;
  top: 30%;
  left: 25%;
  background-color: #ecf0f1;
  border: 2px solid rgba(0,0,0,.0975);
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-sizing: border-box;
  border-color: rgba(70, 219, 115, 0);
`

const Info = styled.div`
  width: 90%;
  height: ${props => (props.mnemonic ? "40px;" : "80px;")};
  border: 0;
  border-radius: 5px;
  background-color: ${props => (props.mnemonic ?  "#ecf0f1;" : "#e67e22;")};
  color: ${props => (props.mnemonic ? "#2980b9" : null)};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  text-align: ${props => (props.mnemonic ? "left;" : "center;")};
  margin:0 auto;
  font-weight: 200;
  font-size: ${props => (props.mnemonic ? "1em;" : "1.1em;")};
  border:  ${props => (props.mnemonic ? "2px solid #305371" : "inherit")};
  padding-left: ${props => (props.mnemonic ? "10px" : "inherit")};
  padding-top: ${props => (props.mnemonic ? "7px" : "10px")};
`;

const Passphrase = styled.div`
  margin-top: 40px;
  margin-left:40px;
  margin-bottom: 30px;
  transition: all 0.1s linear;
  color:#2980b9
`;

const AlertInfo = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-size: 1em;
  transition: all 0.1s linear;
  color: #c0392b;
`;

const Submit = Button.withComponent("input").extend`
  margin-right:10px;
  border: 2px solid #305371;
  box-shadow:none;
  &:hover{
      box-shadow:none;
      transform:none;
  }
  &:disabled{
      color:#999;
      border: 2px solid #999;
      cursor:not-allowed;
      box-shadow:none;
  }
`;

const Input = Submit.extend`
  width: 90%;
  margin-left:40px;
  padding-left: 10px;
  background-color: #ecf0f1;
  &:active {
    background-color: transparent;
  }
  color: ${props => (props.hasError ? "#e74c3c" : "inherit")};
  border-color: ${props => (props.hasError ? "#e74c3c" : "inherit")};
`;

const AccountBoxPresenter = ({ text, balance, address, mnemonic, importMnemonic, AlertImportAccount }) => (
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
                <ImportAccount/> 
                IMPORT ACCOUNT
                </Button>
                <Button
                  onClick={() => store.createAccountModal()}
                >
                <CreateAccount/>
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
                    <Info>
                      {
                        store.statusModal === "create" 
                        ?
                        `Before proceeding further, first BACKUP THE PASSPHRASE SECURELY, this client does NOT store it and thus cannot recover your passphrase! If you lose it, delete it, or it gets stolen - we CANNOT help you recover it. There is no forgot my passphrase option!`
                        :
                        `Passphrase is case sensitive, each character change will result in importing a different Yggdrash address! Passphrases are not saved on this computer so always make sure you have them backed up safely!`
                      }
                    </Info>
                  </FlexItem>
                  <FlexItem>
                    <Passphrase>
                      Passphrase
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
                      <Input
                        placeholder={"PASSPHRASE"}
                        required
                        name="importMnemonic"
                        value={importMnemonic}
                        type={"text"}
                        onChange={store.handleInput}
                      />
                    }
                  </FlexItem>
                  <FlexItem>
                    <AlertInfo>
                      { AlertImportAccount ?  <AlertIcon/> : null}
                      { AlertImportAccount }
                    </AlertInfo>
                  </FlexItem>
                  <Flex alignCenter justifyBetween>
                    <FlexItem>
                      <Fragment>
                      </Fragment>
                    </FlexItem>
                    <FlexItem>
                      <Fragment>
                      <Button 
                          onClick={() => store.statusModal === "create"  ? store.createAccount() : store.importAccount()}>
                          {store.statusModal === "create"  ? `CREATE` : `IMPORT`}
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
    <Account >
      <Flex alignCenter justifyBetween>
        <Address>{address}</Address>
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
  address: PropTypes.string,
  balance: PropTypes.string,
  id: PropTypes.number.isRequired
};

ReactModal.setAppElement('body');

export default AccountBoxPresenter;