import React, { Component } from "react";
import PropTypes from "prop-types";
import AppPresenter from "./AppPresenter";
import update from 'react-addons-update';
import Store from "context/store";

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
          account: {
            ...currentState.account,
          },
          address: update(
            this.state.address,
            {
                $push: [address]
            }
          ),
          showModal: !this.state.showModal,
          newState
        };
      });
    };

    this._createAccountModal = () => {
      // if(this.state.address){
      //   console.log("asdf")
      // }else{
      //   let mnemonic = bip39.generateMnemonic();
      //   this.setState(currentState => {
      //     return {
      //       ...currentState,
      //       account: {
      //         ...currentState.account
      //       },
      //       mnemonic:mnemonic,
      //       showModal: !this.state.showModal,
      //       statusModal:"create"
      //     };
      //   });
      // }
      let mnemonic = bip39.generateMnemonic();
        this.setState(currentState => {
          return {
            ...currentState,
            account: {
              ...currentState.account
            },
            mnemonic:mnemonic,
            showModal: !this.state.showModal,
            statusModal:"create"
          };
        });
        let test = this.state.address.map(k => {
          return k
        })
        console.log(test)
    };

    this._importAccount = () =>{
      if(bip39.validateMnemonic(this.state.importMnemonic)){
        let hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.importMnemonic));
        let wallet = hdwallet.derivePath(path).getWallet();
        let address = "0x" + wallet.getAddress().toString("hex");
        
        this.setState(currentState => {
          const newState = delete currentState.importMnemonic;
          return {
            ...currentState,
            account: {
              ...currentState.account
            },
            address: update(
              this.state.address,
              {
                  $push: [address]
              }
            ),
            showModal: !this.state.showModal,
            statusModal:"import",
            newState
          };
        });
      } else if(this.state.importMnemonic === ""){
        this.setState(() => {
          return {
            AlertImportAccount:"Please enter passphrase!"
          };
        });
        setTimeout(() =>{
          this.setState(() => {
            return {
              AlertImportAccount:""
            };
          });
        }, 1500)
      } else {
        this.setState(() => {
          return {
            AlertImportAccount:"Not valid BIP39 passphrase! Please check all words and spaces."
          };
        });
        setTimeout(() =>{
          this.setState(() => {
            return {
              AlertImportAccount:""
            };
          });
        }, 1500)
      }
    }
    this._importAccountModal = () =>{
      this.setState(currentState => {
        return {
          ...currentState,
            account: {
              ...currentState.account
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
            account: {
              ...currentState.account
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
      address:[],
      mnemonic:"",
      showModal: false,
      statusModal:"",
      importMnemonic:"",
      AlertImportAccount:"",
      text: `My Accounts`,
      account: {
        "1": {
          id: 1
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
