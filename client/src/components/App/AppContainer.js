import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
// import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from "../../constants";
import AppPresenter from "./AppPresenter";
import ksHelper from "accounts/keyGeneration";
import Store from "context/store";

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
      let etherAccount = {};
      // let { passPharse } = this.state;
      let passPharse = 'pass'
      const { address, keystoreData } = ksHelper.create(passPharse);
      const pk = ksHelper.getPrivateKey(keystoreData, passPharse);
      const privateKey = pk.toString('hex');
      etherAccount = {
        address,
        privateKey
      };

      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications
          },
          address:etherAccount.address
        };
      });
    };

    this._importAccount = () =>{
      this.toggleModal = (e) => {
        this.setState({ isOpen: !this.state.isOpen })
      }
    }

    this.state = {
      isLoading: true,
      isMining: false,
      isOpen: false,
      balance: "0",
      address:"",
      passPharse:"",
      notifications: {
        "1": {
          id: 1,
          text: `My Accounts`
        }
      },
      createAccount: this._createAccount,
      importAccount: this._importAccount
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
