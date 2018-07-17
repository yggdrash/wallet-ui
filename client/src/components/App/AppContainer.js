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
const path = "m/44'/60'/0'/0/0";

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      const { sharedPort } = this.props;
    };

    /**
     * bip39, mnemonic생성
     * Create HDwallet from Master Seed 
     * @method createAccount
     * @param mnemonicToSeed mnemonic buffer한 값
    */
    this._createAccount = () => {
      let hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));
      let wallet = hdwallet.derivePath(path).getWallet();
      let address = "0x" + wallet.getAddress().toString("hex");
      // let privateKey = "0x" + wallet.getPrivateKey().toString("hex");
      // let chiledWallet = hdwallet.deriveChild(1).getWallet();
      // let address2 = "0x" + chiledWallet.getAddress().toString("hex");
      
      this.setState(currentState => {
        const newState = delete currentState.mnemonic;
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications
          },
          address:address,
          showModal: !this.state.showModal,
          newState
        };
      });
    };

    this._createAccountModal = () => {
      if(this.state.address){
        console.log("asdf")
      }else{
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
      }
    };
    // final sentence profit common mule west file income doctor nut fortune west //0x63ecae2fce
    // mixture fork fringe noise calm opinion topple dilemma avoid muffin pupil sunny //0x8695fd49
    // hello bomb way drink hold wear medal wonder dinosaur tip shallow minor //0x2372e105193
    this._importAccount = () =>{
      if(bip39.validateMnemonic(this.state.importMnemonic)){
        let hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.importMnemonic));
        let wallet = hdwallet.derivePath(path).getWallet();
        let address = "0x" + wallet.getAddress().toString("hex");
        
        this.setState(currentState => {
          const newState = delete currentState.importMnemonic;
          return {
            ...currentState,
            notifications: {
              ...currentState.notifications
            },
            showModal: !this.state.showModal,
            address:address,
            statusModal:"import",
            newState
          };
        });
      } else if(this.state.importMnemonic === ""){
        this.setState(currentState => {
          return {
            AlertImportAccount:"Please enter seed.",
          };
        });
      } else {
        this.setState(currentState => {
          return {
            AlertImportAccount:"If the seed is not correct, check the space between the seeds.",
          };
        });
      }
    }
    this._importAccountModal = () =>{
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
        try{
          const newState = delete currentState.importMnemonic;
          return {
            ...currentState,
            notifications: {
              ...currentState.notifications
            },
            showModal: !this.state.showModal,
            statusModal:"import",
            newState,
            AlertImportAccount:""
          };
        }catch(e){
          console.log(e)
        }
      });
    }

    this._handleInput = e => {
      const { target: { name, value } } = e;
      this.setState({
        [name]: value,
        AlertImportAccount:""
      });
    };

    this.state = {
      balance: "0",
      address:"",
      mnemonic:"",
      showModal: false,
      statusModal:"",
      importMnemonic:"",
      AlertImportAccount:"",
      notifications: {
        "1": {
          id: 1,
          text: `My Accounts`
        }
      },
      createAccount: this._createAccount,
      createAccountModal: this._createAccountModal,
      importAccount: this._importAccount,
      importAccountModal: this._importAccountModal,
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
