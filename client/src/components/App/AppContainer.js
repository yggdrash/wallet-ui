import React, { Component } from "react";
import PropTypes from "prop-types";
import AppPresenter from "./AppPresenter";
import update from 'react-addons-update';
import Store from "context/store";
import { toBuffer } from "utils"
import { fromPrivateKey } from "accounts/wallet"
import { isThisSecond } from "date-fns";

const HDKey = require("accounts/hdkey");
const bip39 = require("bip39");
const path = "m/44'/60'/0'/0/0";

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      const { sharedPort } = this.props;
      document.body.addEventListener("keydown", this.closeLastPopup)
    };

    this.closeLastPopup = e => {
      if (!(e.key == "Escape" || e.keyCode == 27)) return
      if(this.state.showModal === true){
        this.setState({ 
          showModal: !this.state.showModal,
          word3:"",
          word6:"",
          word9:"",
          AlertImportAccount:"",
          importMnemonic:""
        })
      }else if(this.state.showAccountModal === true){
        this.setState({ 
          showAccountModal: !this.state.showAccountModal,
          word3:"",
          word6:"",
          word9:"",
          AlertImportAccount:"",
          importMnemonic:""
        })
      }else if(this.state.hidden === false){
        this.setState({ 
          hidden: !this.state.hidden
        })
      }
     }
    
    /**
     * bip39, mnemonic생성
     * Create HDwallet from Master Seed 
     * @method createAccount
     * @param mnemonicToSeed mnemonic buffer한 값
    */
    this._createAccount = () => {
      let wordSplit = this.state.mnemonic.split(" ");
      if(wordSplit[2]=== this.state.word3 && wordSplit[5]=== this.state.word6 && wordSplit[8]=== this.state.word9){
        let hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));
        let wallet = hdwallet.derivePath(path).getWallet();
        let address = wallet.getAddressString();

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
            word3:"",
            word6:"",
            word9:"",
            showModal: !this.state.showModal,
            newState
          };
        });
      }else {
        this.setState(() => {
          return {
              AlertImportAccount:"The words does not match the original passphrase."
          };
        });
        setTimeout(() =>{
          this.setState(() => {
              return {
                  AlertImportAccount:""
              };
          });
        }, 2000)
      }

      // ** transaction sign ** 
      // let fromPrivateKeyBuffer = wallet.getPrivateKey();
      // const tx = new yeedTx(txData);
      // tx.sign(fromPrivateKeyBuffer);
      
      // let privateKey = fromPrivateKeyBuffer.toString('hex');
      // const yeedAccount = fromPrivateKey(toBuffer(`0x${privateKey}`));
      // const fromAddress = yeedAccount.getAddressString();
    };
    this._createAccountModal = () => {
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
    };

    this._confirmCreateAccount = () => {
        this.setState(() => {
          return {
            statusModal:"confirm"
          };
        });
    };

    /**
     * bip39, 유효한 bip39 mnemonic 검증
     * 소유한 HD Wallet Account 예외처리
     * Input null 예외처리
     */
    this._importAccount = () =>{
      var Break = new Error('Break')
      if(bip39.validateMnemonic(this.state.importMnemonic)){
        let hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.importMnemonic));
        let wallet = hdwallet.derivePath(path).getWallet();
        let address = "0x" + wallet.getAddress().toString("hex");
        try{
            let check = this.state.address.map(addr => {
                if(addr === address){
                    this.setState(() => {
                        return {
                            AlertImportAccount:"This account is already owned by you."
                        };
                    });
                    setTimeout(() =>{
                        this.setState(() => {
                            return {
                                AlertImportAccount:""
                            };
                        });
                    }, 2000)
                    throw Break;
                }
            });
            this.setImportAccount(address);
        } catch (e) {
            if (e!== Break) throw Break;
        }
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
        }, 2000)
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
        }, 2000)
      }
    };

    this.setImportAccount = address => {
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
    };

    this._closeModal = (e) =>{
      this.setState(currentState => {
        const newState = delete currentState.importMnemonic;
        return {
          ...currentState,
          account: {
            ...currentState.account
          },
          showModal: e === "account" ? this.state.showModal : !this.state.showModal,
          showAccountModal: e === "account" ? !this.state.showAccountModal : this.state.showAccountModal,
          newState,
          AlertImportAccount:"",
          word3:"",
          word6:"",
          word9:""
        };
      });
    }

    this._handleInput = e => {
      const { target: { name, value } } = e;
      this.setState({
        [name]: value,
        AlertImportAccount:""
      });
    };
    this._AccountModal = address => {
      this.setState(() => {
        return {
          showAccountModal: !this.state.showAccountModal,
          selectAddress:address
        };
      });
    }

    this._handleOpenCloseDropdown = () => {
      this.setState({
        hidden: !this.state.hidden,
      });
    };

    this.state = {
      balance: "0",
      address:[],
      selectAddress:"",
      mnemonic:"",
      showModal: false,
      showAccountModal: false,
      hidden:true,
      statusModal:"",
      importMnemonic:"",
      word3:"",
      word6:"",
      word9:"",
      AlertImportAccount:"",
      text: `My Accounts`,
      account: {
        "1": {
          id: 1
        }
      },
      handleOpenCloseDropdown: this._handleOpenCloseDropdown,
      createAccount: this._createAccount,
      createAccountModal: this._createAccountModal,
      confirmCreateAccount: this._confirmCreateAccount,
      importAccount: this._importAccount,
      importAccountModal: this._importAccountModal,
      handleInput:this._handleInput,
      AccountModal:this._AccountModal,
      closeModal: this._closeModal,
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
