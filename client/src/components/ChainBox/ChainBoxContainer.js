import React, { Component } from "react";
import PropTypes from "prop-types";
import ChainBoxPresenter from "./ChainBoxPresenter";
// import Store from "context/store";

class ChainBoxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.componentDidMount = () => {
      
    };
    

  }
  render() {
    return <ChainBoxPresenter {...this.props} {...this.state} 

            />;
  }
}

ChainBoxContainer.propTypes = {
  toAddress: PropTypes.string,
  amount: PropTypes.string,
  selectAddress: PropTypes.string,
};

ChainBoxContainer.defaultProps = {
  createAccount: PropTypes.func,
  createAccountModal: PropTypes.func,
  importAccountModal: PropTypes.func,
  importAccount: PropTypes.func,
  generationMnemonic: PropTypes.func,
  closeModal: PropTypes.func,
};

export default ChainBoxContainer;
