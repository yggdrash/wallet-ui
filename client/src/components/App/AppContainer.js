import React, { Component } from "react";
import PropTypes from "prop-types";
import AppPresenter from "./AppPresenter";
import update from 'react-addons-update';
import Store from "context/store";
import { toBuffer } from "utils"
import { fromPrivateKey } from "accounts/wallet"

const elliptic = require("elliptic"),
  path = require("path"),
  bip38 = require('bip38'),
  bip38Decrypt = require('bip38-decrypt'),
  wif = require('wif'),
  HDKey = require("accounts/hdkey"),
  bip39 = require("bip39"),
  owasp = require('owasp-password-strength-test');
  
const HDpath = "m/44'/60'/0'/0/0";
const privateKeyLocation = path.join(__dirname, "keystore/keystoredata");
class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      const { sharedPort } = this.props;
      document.body.addEventListener("keydown", this.closeLastPopup)
    };

    // this.getPrivateFromWallet = () => {
    //   console.log("Asdf")
    //   const buffer = fs.readFileSync(privateKeyLocation, "utf8");
    //   return buffer.toString();
    // };

    this.closeLastPopup = e => {
      if (!(e.key == "Escape" || e.keyCode == 27)) return
      if(this.state.showModal === true){
        this.setState({ 
          showModal: !this.state.showModal,
          word3:"",
          word6:"",
          word9:"",
          AlertImportAccount:"",
          importMnemonic:"",
          confirmRecoveryPharse:true,
          recoveryPharse:"",
          accountName:"",
          password:"",
          confirmPassword:""
        })
      }else if(this.state.showAccountModal === true && this.state.showTransferModal === true){
        this.setState({ 
          showTransferModal: !this.state.showTransferModal,
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
      }else if(this.state.menuHidden === false){
        this.setState({ 
          menuHidden: !this.state.menuHidden
        })
      }
     }
    
    this._createAccountModal = () => {
      var result = owasp.test('asdf a');
      console.log(result)
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

      // const hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));
      // const wallet = hdwallet.derivePath(HDpath).getWallet();
      // let address = wallet.getAddressString();

      // const fromPrivateKeyBuffer = wallet.getPrivateKey();
      // const privatekeyEncryptedKey = bip38.encrypt(fromPrivateKeyBuffer, true, 'TestingOneTwoThree')
      // const passwordEncryptedKey = bip38.encrypt(this.state.password, true, 'TestingOneTwoThree')



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
      
      // bip38Decrypt(passwordEncryptedKey,'TestingOneTwoThree', (err, decryptedPrivateWif) => {
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
      
      // if (fs.existsSync(privateKeyLocation)) {
      //   return;
      // }

      // const hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));
      // const wallet = hdwallet.derivePath(HDpath).getWallet();
      // let address = wallet.getAddressString();
      // let privateKey = "0x" + wallet.getPrivateKey().toString("hex");
      // fs.writeFileSync(privateKeyLocation, privateKey);

      if(wordSplit[2]=== this.state.word3 && wordSplit[5]=== this.state.word6 && wordSplit[8]=== this.state.word9){
        const { accountName, password } = this.state
        const hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));
        const wallet = hdwallet.derivePath(HDpath).getWallet();
        let address = wallet.getAddressString();
        // let privateKey = "0x" + wallet.getPrivateKey().toString("hex");


        const fromPrivateKeyBuffer = wallet.getPrivateKey();
        const privatekeyEncryptedKey = bip38.encrypt(fromPrivateKeyBuffer, true, password)
        // const passwordEncryptedKey = bip38.encrypt(this.state.password, true, this.state.password)

        // const params = {
        //   n: 4096
        // };
        // const keystoreData = JSON.stringify(wallet.toV3(this.state.password, params));

        
        const uuid = this.guid();
  
        let account ={
          uuid,
          accountName,
          address,
          privatekeyEncryptedKey
        }

        this.setState(currentState => {
          const newState = delete currentState.mnemonic;
          return {
            ...currentState,
            accountBox: {
              ...currentState.accountBox,
            },
            // address: update(
            //   this.state.address,
            //   {
            //       $push: [address]
            //   }
            // ),
            accounts: update(
              this.state.accounts,
              {
                  $push: [account]
              }
            ),
            word3:"",
            word6:"",
            word9:"",
            accountName:"",
            password:"",
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
      if(bip39.validateMnemonic(this.state.importMnemonic)){
        let hdwallet = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.importMnemonic));
        let wallet = hdwallet.derivePath(HDpath).getWallet();
        let address = "0x" + wallet.getAddress().toString("hex");
        try{
            if(this.state.accountName===""){
              this.setState(() => {
                return {
                    AlertImportAccountName:"Please enter your account name."
                };
              });
              throw Break;
            } else if(this.state.password===""){
              this.setState(() => {
                return {
                    AlertImportAccountPass:"Please enter password."
                };
              });
              throw Break;
            } else if(this.state.confirmPassword===""){
              this.setState(() => {
                return {
                    AlertImportAccountConfirmPass:"Please enter verity password."
                };
              });
              throw Break;
            }
            let check = this.state.address.map(addr => {
                if(addr === address){
                    this.setState(() => {
                        return {
                            AlertImportAccount:"This account is already owned by you."
                        };
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
              AlertImportAccountName:"Please enter your account name."
          };
        });
      } else if(this.state.password===""){
        this.setState(() => {
          return {
              AlertImportAccountPass:"Please enter password."
          };
        });
      } else if(this.state.confirmPassword===""){
        this.setState(() => {
          return {
              AlertImportAccountConfirmPass:"Please enter verity password."
          };
        });
      } else if(this.state.importMnemonic === ""){
        this.setState(() => {
          return {
            AlertImportAccount:"Please enter passphrase!"
          };
        });
      } else {
        this.setState(() => {
          return {
            AlertImportAccount:"Not valid BIP39 passphrase! Please check all words and spaces."
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
      const { accountName, password } = this.state
      const uuid = this.guid();
      const fromPrivateKeyBuffer = wallet.getPrivateKey();
      const privatekeyEncryptedKey = bip38.encrypt(fromPrivateKeyBuffer, true, password)

      let account ={
        uuid,
        accountName,
        address,
        privatekeyEncryptedKey
      }

      this.setState(currentState => {
        const newState = delete currentState.importMnemonic;
        return {
            ...currentState,
            accountBox: {
                ...currentState.accountBox
            },
            address: update(
                this.state.address,
                {
                    $push: [address]
                }
            ),
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
            confirmPassword:""
        };
      });
    }

    this.guid = () => {
      const s4 = () => {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    this._closeModal = (e) =>{
      this.setState(currentState => {
        const newState = delete currentState.importMnemonic;
        return {
          ...currentState,
          account: {
            ...currentState.account
          },
          showModal: e === "main" ? !this.state.showModal : false,
          showTransferModal: e === "transfer" ? !this.state.showTransferModal : false,
          showAccountModal: e === "transfer" ? this.state.showAccountModal : false,
          newState,
          AlertImportAccount:"",
          word3:"",
          word6:"",
          word9:"",
          confirmRecoveryPharse:true,
          recoveryPharse:"",
          accountName:"",
          password:"",
          confirmPassword:""
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

      const { target: { name, value } } = e;
      this.setState({
        [name]: value,
        AlertImportAccount:""
      });
    };

    // this.noCTRL = e => {
    //   var code = (document.all) ? event.keyCode:e.which;
    //   var ctrl = (document.all) ? event.ctrlKey:e.modifiers & Event.CONTROL_MASK;
    //   if (document.all)
    //   {
    //     if (ctrl && code==86) //CTRL+V
    //     {
    //       window.event.returnValue = false;
    //     }
    //     else if (ctrl && code==67) //CTRL+C (Copy)
    //     {
    //       window.event.returnValue = false;
    //     }
    //   }
      
    // } 
    this._AccountModal = address => {
      this.setState(() => {
        return {
          showAccountModal: !this.state.showAccountModal,
          selectAddress:address,
          statusModal:"account" 
        };
      });
    }

    this._handleOpenCloseDropdown = e => {
      if(e==="network"){
        this.setState({
          netMenuHidden: !this.state.netMenuHidden
        });
      }else if(e==="cog"){
        this.setState({
          cogMenuHidden: !this.state.cogMenuHidden
        });
      }
      
    };

    this._handleTooltip = (ev, copyHidden) => {
      this.setState({
        top: ev.target.offsetTop + 5,
        left: ev.target.offsetLeft + ev.target.offsetWidth + 5,
        copyHidden
      });
    }

    this._TransferModal = () => {
      this.setState(() => {
        return {
          showTransferModal: !this.state.showTransferModal,
          statusModal:"transfer" 
        };
      });
    }


    this.state = {
      uuid:[],
      accountName:[],
      address:[],
      encryptedKey:[],
      accounts:[],
      balance: "0",
      toAddress: "",
      amount:0,
      selectAddress:"",
      mnemonic:"",
      password:"",
      confirmPassword:"",
      showModal: false,
      showAccountModal: false,
      showTransferModal: false,
      netMenuHidden:true,
      cogMenuHidden:true,
      copyHidden:true,
      top: 0,
      left: 0,
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
      text: `My Accounts`,
      accountBox: {
        "1": {
          id: 1
        }
      },
      handleOpenCloseDropdown: this._handleOpenCloseDropdown,
      handleTooltip: this._handleTooltip,
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
      TransferModal: this._TransferModal
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
