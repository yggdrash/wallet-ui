import React, { Component } from "react";
import PropTypes from "prop-types";
import AppPresenter from "./AppPresenter";
import update from 'react-addons-update';
import Store from "context/store";

const bip38 = require('bip38'),
  HDKey = require("accounts/hdkey"),
  bip39 = require("bip39"),
  passValid = require("password-strength");

const HDpath = "m/44'/60'/0'/0/0";
class AppContainer extends Component {
  constructor(props) {
    super(props);
    const { lowdb } = this.props;
    this.componentDidMount = () => {
      document.body.addEventListener("keydown", this.closeLastPopup);
    };
    this.closeLastPopup = e => {
      if (!(e.key === "Escape" || e.keyCode === 27)) return
      if(this.state.showModal === true){
        this.setState({ 
          showModal: !this.state.showModal,
          word3:"",
          word6:"",
          word9:"",
          AlertImportAccount:"",
          importMnemonic:"",
          mnemonic:"",
          confirmRecoveryPharse:true,
          recoveryPharse:"",
          accountName:"",
          password:"",
          confirmPassword:"",
          isloading:false,
          passwordValid:""
        })
      }else if(this.state.showAccountModal === true && this.state.showDetailAccountMenuModal === true){
        this.setState({ 
          showDetailAccountMenuModal: !this.state.showDetailAccountMenuModal,
          word3:"",
          word6:"",
          word9:"",
          AlertImportAccount:"",
          importMnemonic:"",
          mnemonic:"",
          editor: false,
          isloading:false
        })
      }else if(this.state.showAccountModal === true){
        this.setState({ 
          showAccountModal: !this.state.showAccountModal,
          word3:"",
          word6:"",
          word9:"",
          AlertImportAccount:"",
          importMnemonic:"",
          mnemonic:"",
          editor: false,
          isloading:false
        })
      }else if(this.state.menuHidden === false){
        this.setState({ 
          menuHidden: !this.state.menuHidden,
          isloading:false
        })
      }
     }
    
    this._createAccountModal = () => {
      this.setState(currentState => {
        return {
          ...currentState,
          accountBox: {
            ...currentState.accountBox
          },
          accountName:"",
          password:"",
          confirmPassword:"",
          showModal: !this.state.showModal,
          statusModal:"password"
        };
      });
    };

    this._setPassword = () =>{
      if(this.state.accountName===""){
        this.setState(() => {
          return {
              AlertImportAccountName:"Please enter your account name.",
              isloading:false
          };
        });
      } else if(this.state.password===""){
        this.setState(() => {
          return {
              AlertImportAccountPass:"Please enter password.",
              isloading:false
          };
        });
      } else if(this.state.passwordValid === "defalt" || this.state.passwordValid === "red"){
        this.setState(() => {
          return {
              AlertImportAccountPass:"Week, try combining letters & numbers",
              isloading:false
          };
        });
      } else if(this.state.password !== this.state.confirmPassword){
        this.setState(() => {
          return {
              AlertImportAccountPass:"Passwords do not match.",
              AlertImportAccountConfirmPass:" ",
              isloading:false
          };
        });
      } else if(this.state.confirmPassword===""){
        this.setState(() => {
          return {
              AlertImportAccountConfirmPass:"Please enter verity password.",
              isloading:false
          };
        });
      }else {
        let mnemonic = bip39.generateMnemonic();
        this.setState(currentState => {
          return {
            ...currentState,
            accountBox: {
              ...currentState.accountBox
            },
            accountName:this.state.accountName,
            password:this.state.password,
            mnemonic:mnemonic,
            statusModal:"create"
          };
        });
      }
      setTimeout(() =>{
        this.setState(() => {
          return {
            AlertImportAccount:"",
            AlertImportAccountName:"",
            AlertImportAccountPass:"",
            AlertImportAccountConfirmPass:""
          };
        });
      }, 2000)
    }

    this._generationMnemonic = () => {
      if(this.state.confirmRecoveryPharse === false){
        this.setState(() => {
          return {
            statusModal:"confirm",
            recoveryPharse:""
          };
        });
      }else{
        this.setState(() => {
          return {
            AlertImportAccount:""
          };
        });
      }
    };

    /**
     * bip39, mnemonic생성
     * Create HDwallet from Master Seed 
     * @method createAccount
     * @param mnemonicToSeed mnemonic buffer한 값
    */
    this._createAccount = () => {
      let wordSplit = this.state.mnemonic.split(" ");
      this.setState({isloading:true});
      // const hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));
      // const wallet = hdwallet.derivePath(HDpath).getWallet();
      // let address = wallet.getAddressString();

      // const fromPrivateKeyBuffer = wallet.getPrivateKey();
      // const privatekeyEncryptedKey = bip38.encrypt(fromPrivateKeyBuffer, true, 'TestingOneTwoThree')

      // bip38Decrypt(privatekeyEncryptedKey,'TestingOneTwoThree', (err, decryptedPrivateWif) => {
      //   if (err){
      //     console.log(err.msg);
      //     return err;
      //   }
      //   else {
      //     console.log(decryptedPrivateWif);
      //     const decoded = wif.decode(decryptedPrivateWif)
      //     console.log(decoded.privateKey.toString("hex"));
      //     return decryptedPrivateWif;
      //   }
      // });
      
      

      if(wordSplit[2]=== this.state.word3 && wordSplit[5]=== this.state.word6 && wordSplit[8]=== this.state.word9){
        const { accountName, password } = this.state
        const hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));
        const wallet = hdwallet.derivePath(HDpath).getWallet();
        let address = wallet.getAddressString();
        const uuid = this.guid();
        // let privateKey = "0x" + wallet.getPrivateKey().toString("hex");
        const fromPrivateKeyBuffer = wallet.getPrivateKey();
        
        // const passwordEncryptedKey = bip38.encrypt(this.state.password, true, this.state.password)

        // const params = {
        //   n: 4096
        // };
        // const keystoreData = JSON.stringify(wallet.toV3(this.state.password, params));
  
        setTimeout(() =>{
          const privatekeyEncryptedKey = bip38.encrypt(fromPrivateKeyBuffer, true, password )
          lowdb.get('accounts').push({
            uuid:uuid,
            name:accountName,
            address:address
          }).write()
          lowdb.get('principal').push({
            address:address,
            EncryptedKey:privatekeyEncryptedKey
          }).write()
  
          this.setState(currentState => {
            const newState = delete currentState.mnemonic;
            return {
              ...currentState,
              accountBox: {
                ...currentState.accountBox,
              },
              word3:"",
              word6:"",
              word9:"",
              accountName:"",
              password:"",
              showModal: !this.state.showModal,
              newState
            };
          });
          }, 100)
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
    };

    this._importAccountModal = () =>{
      this.setState(currentState => {
        return {
          ...currentState,
          accountBox: {
            ...currentState.accountBox
          },
          accountName:"",
          password:"",
          confirmPassword:"",
          showModal: !this.state.showModal,
          statusModal:"import"
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
      this.setState(() => {
        return {
            isloading:true
        };
      });
      if(bip39.validateMnemonic(this.state.importMnemonic)){
        let hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.importMnemonic));
        let wallet = hdwallet.derivePath(HDpath).getWallet();
        let address = "0x" + wallet.getAddress().toString("hex");
        try{
            if(this.state.accountName===""){
              this.setState(() => {
                return {
                    AlertImportAccountName:"Please enter your account name.",
                    isloading:false
                };
              });
              throw Break;
            } else if(this.state.password===""){
              this.setState(() => {
                return {
                    AlertImportAccountPass:"Please enter password.",
                    isloading:false
                };
              });
              throw Break;
            } else if(this.state.confirmPassword===""){
              this.setState(() => {
                return {
                    AlertImportAccountConfirmPass:"Please enter verity password.",
                    isloading:false
                };
              });
              throw Break;
            }
            lowdb.get("accounts").map("address").value().map(addr => {
                if(addr === address){
                    this.setState({
                        AlertImportAccount:"This account is already owned by you.",
                        isloading:false
                    });
                    throw Break;
                }
            });
            this.setImportAccount(address, wallet);
        } catch (e) {
            if (e!== Break) throw Break;
        }
      } else if(this.state.accountName===""){
        this.setState(() => {
          return {
              AlertImportAccountName:"Please enter your account name.",
              isloading:false
          };
        });
      } else if(this.state.password===""){
        this.setState(() => {
          return {
              AlertImportAccountPass:"Please enter password.",
              isloading:false
          };
        });
      } else if(this.state.passwordValid === "defalt" || this.state.passwordValid === "red"){
        this.setState(() => {
          return {
              AlertImportAccountPass:"Week, try combining letters & numbers",
              isloading:false
          };
        });
      } else if(this.state.password !== this.state.confirmPassword){
        this.setState(() => {
          return {
              AlertImportAccountPass:"Passwords do not match.",
              AlertImportAccountConfirmPass:" ",
              isloading:false
          };
        });
      } else if(this.state.confirmPassword===""){
        this.setState(() => {
          return {
              AlertImportAccountConfirmPass:"Please enter verity password.",
              isloading:false
          };
        });
      } else if(this.state.importMnemonic === ""){
        this.setState(() => {
          return {
            AlertImportAccount:"Please enter passphrase!",
            isloading:false
          };
        });
      } else {
        this.setState(() => {
          return {
            AlertImportAccount:"Not valid BIP39 passphrase! Please check all words and spaces.",
            isloading:false
          };
        });
      }
      setTimeout(() =>{
        this.setState(() => {
          return {
            AlertImportAccount:"",
            AlertImportAccountName:"",
            AlertImportAccountPass:"",
            AlertImportAccountConfirmPass:""
          };
        });
      }, 2000)
    };

    this.setImportAccount = (address, wallet)=> {
      const { lowdb } = this.props;
      const { accountName, password } = this.state
      const uuid = this.guid();
      const fromPrivateKeyBuffer = wallet.getPrivateKey();
      setTimeout(() =>{
        const privatekeyEncryptedKey = bip38.encrypt(fromPrivateKeyBuffer, true, password)
        let account ={
          uuid,
          accountName,
          address,
          privatekeyEncryptedKey
        }
          
        lowdb.get('accounts').push({
          uuid:uuid,
          name:accountName,
          address:address
        }).write()
        lowdb.get('principal').push({
          address:address,
          EncryptedKey:privatekeyEncryptedKey
        }).write()

        this.setState(currentState => {
          const newState = delete currentState.importMnemonic;
          return {
              ...currentState,
              accountBox: {
                  ...currentState.accountBox
              },
              accounts: update(
                this.state.accounts,
                {
                    $push: [account]
                }
              ),
              showModal: !this.state.showModal,
              statusModal:"import",
              newState,
              accountName:"",
              password:"",
              confirmPassword:"",
              isloading:false,
              passwordValid:""
          };
        });
        }, 100)
    }

    this.guid = () => {
      const s4 = () => {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    this._closeModal = (e) =>{
      this.setState(currentState => {
        const newImportMnemonic = delete currentState.importMnemonic;
        const newMnemonic = delete currentState.mnemonic;
        return {
          ...currentState,
          account: {
            ...currentState.account
          },
          showModal: e === "main" ? !this.state.showModal : false,
          showDetailAccountMenuModal: e === "transfer" ? !this.state.showDetailAccountMenuModal : false,
          showAccountModal: e === "transfer" ? this.state.showAccountModal : false,
          newImportMnemonic,
          newMnemonic,
          AlertImportAccount:"",
          word3:"",
          word6:"",
          word9:"",
          confirmRecoveryPharse:true,
          recoveryPharse:"",
          accountName:"",
          password:"",
          confirmPassword:"",
          passwordValid:"",
          editor: false
        };
      });
    }

    this._handleInput = e => {
    if(e.target.name === "recoveryPharse" && e.target.value === "I have written down the pharse"){
      this.setState({
        confirmRecoveryPharse:false
      })
    }else{
      this.setState({
        confirmRecoveryPharse:true
      })
    }
    if(e.target.name === "password"){
      let valid = passValid(e.target.value)
      if(valid.valid === false && valid.strength === "simple" && valid.hint !== null){
        this.setState({
          passwordValid:"red"
        })
      } else if(valid.valid === true && valid.strength === "simple"){
        this.setState({
          passwordValid:"yellow"
        })
      } else if(valid.strength === "medium"){
        this.setState({
          passwordValid:"blue"
        })
      } else if(valid.strength === "strong"){
        this.setState({
          passwordValid:"green"
        })
      }
    }
    if(e.target.name === "password" && e.target.value.length === 0){
      this.setState({
        passwordValid:"defalt"
      })
    }

      const { target: { name, value } } = e;
      this.setState({
        [name]: value,
        AlertImportAccount:"",
        AlertImportAccountName:"",
        AlertImportAccountPass:"",
        AlertImportAccountConfirmPass:""
      });
    };
    this._AccountModal = (address, name) => {
      this.setState(() => {
        return {
          showAccountModal: !this.state.showAccountModal,
          selectAddress:address,
          selectName:name,
          statusModal:"account" 
        };
      });
    }

    this._DetailAccountMenuModal = () => {
      this.setState(() => {
        return {
          showDetailAccountMenuModal: !this.state.showDetailAccountMenuModal,
          statusModal:"transfer" 
        };
      });
    }

    this._edit = address => {
      if(this.state.editor === true && this.state.selectName === ""){
        return false
      }else if(this.state.editor ===true && this.state.selectName !== ""){
        lowdb.get("accounts").find({address:address}).assign({name:this.state.selectName}).write()
      }
      this.setState({
        editor: !this.state.editor,
        selectName:lowdb.get("accounts").find({address:address}).value().name
      });
    }

    this.state = {
      isloading:false,
      accounts:[],
      balance: "0",
      toAddress: "",
      amount:"",
      selectAddress:"",
      selectName:"",
      mnemonic:"",
      password:"",
      confirmPassword:"",
      passwordValid:"",
      showModal: false,
      showAccountModal: false,
      showDetailAccountMenuModal: false,
      statusModal:"",
      importMnemonic:"",
      recoveryPharse:"",
      confirmRecoveryPharse:true,
      word3:"",
      word6:"",
      word9:"",
      AlertImportAccount:"",
      AlertImportAccountName:"",
      AlertImportAccountPass:"",
      AlertImportAccountConfirmPass:"",
      accountBox: {
        "1": {
          id: 1
        }
      },
      handleOpenCloseDropdown: this._handleOpenCloseDropdown,
      createAccount: this._createAccount,
      createAccountModal: this._createAccountModal,
      setPassword: this._setPassword,
      generationMnemonic: this._generationMnemonic,
      importAccount: this._importAccount,
      importAccountModal: this._importAccountModal,
      handleInput:this._handleInput,
      handleSubmit:this._handleSubmit,
      AccountModal:this._AccountModal,
      closeModal: this._closeModal,
      DetailAccountMenuModal: this._DetailAccountMenuModal,
      edit:this._edit,
      editor:false,
      lowdb:lowdb
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

AppContainer.defaultProps = {
  createAccount: PropTypes.func,
  createAccountModal: PropTypes.func,
  importAccountModal: PropTypes.func,
  importAccount: PropTypes.func,
  generationMnemonic: PropTypes.func,
  closeModal: PropTypes.func,
  selectAddress: PropTypes.string,
  toAddress: PropTypes.string,
  amount: PropTypes.string
};

export default AppContainer;
