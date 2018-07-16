import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
// import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from "../../constants";
import AppPresenter from "./AppPresenter";
// import ksHelper from "accounts/keyGeneration";
import Store from "context/store";

// const HDKey = require("accounts/hdkey");
const HDKey = require("accounts/hdkey");
const bip39 = require("bip39");

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      const { sharedPort } = this.props;
    };

    /**
     * keyStore 파일 생성
     * keyStore data를 이용하여 get private key 
     * @method createAccount
    */
    this._createAccount = () => {
      // let etherAccount = {};
      // let passPharse = 'pass'
      // const { address, keystoreData } = ksHelper.create(passPharse);
      // const pk = ksHelper.getPrivateKey(keystoreData, passPharse);
      // const privateKey = pk.toString('hex');
      // etherAccount = {
      //   address,
      //   privateKey
      // };
      let path = "m/44'/60'/0'/0/0";

      let hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));
      let wallet = hdwallet.derivePath(path).getWallet();
      let address = "0x" + wallet.getAddress().toString("hex");
      // let privateKey = "0x" + wallet.getPrivateKey().toString("hex");
      // let chiledWallet = hdwallet.deriveChild(1).getWallet();
      // let address2 = "0x" + chiledWallet.getAddress().toString("hex");
      // let key = HDKey.fromExtendedKey(hdwallet.privateExtendedKey())
      
      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications
          },
          address:address,
          showModal: !this.state.showModal,
        };
      });
    };

    this._createAccountModal = () => {
      let mnemonic = bip39.generateMnemonic();
      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications
          },
          mnemonic:mnemonic,
          showModal: !this.state.showModal,
          statusModal:"create"
        };
      });
    };

    this._importAccount = () =>{
      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications
          },
          showModal: !this.state.showModal,
          statusModal:"import"
        };
      });
    }

    this._closeModal = () =>{
      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications
          },
          showModal: !this.state.showModal,
          statusModal:"import"
        };
      });
    }

    this._handleInput = e => {
      const { target: { name, value } } = e;
      this.setState({
        [name]: value
      });
    };

    this.state = {
      isLoading: true,
      isMining: false,
      isOpen: false,
      balance: "0",
      address:"",
      passPharse:"",
      mnemonic:"",
      showModal: false,
      statusModal:"",
      importMnemonic:"",
      notifications: {
        "1": {
          id: 1,
          text: `My Accounts`
        }
      },
      createAccount: this._createAccount,
      createAccountModal: this._createAccountModal,
      importAccount: this._importAccount,
      handleInput:this._handleInput,
      closeModal: this._closeModal
    };
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <AppPresenter />
      </Store.Provider>
    );
  }
}

AppContainer.propTypes = {
  sharedPort: PropTypes.number.isRequired
};

export default AppContainer;
