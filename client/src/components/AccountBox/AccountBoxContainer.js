import React, { Component } from "react";
import PropTypes from "prop-types";
import AccountBoxPresenter from "./AccountBoxPresenter";
// import Store from "context/store";

class AccountBoxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.componentDidMount = () => {
      
    };
    

  }
  render() {
    return <AccountBoxPresenter {...this.props} {...this.state} 

            />;
  }
}

AccountBoxContainer.propTypes = {
  toAddress: PropTypes.string,
  amount: PropTypes.string,
  selectAddress: PropTypes.string,
};

AccountBoxContainer.defaultProps = {
  createAccount: PropTypes.func,
  createAccountModal: PropTypes.func,
  importAccountModal: PropTypes.func,
  importAccount: PropTypes.func,
  generationMnemonic: PropTypes.func,
  closeModal: PropTypes.func,
};

export default AccountBoxContainer;
