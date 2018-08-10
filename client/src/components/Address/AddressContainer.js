import React, { Component } from "react";
import PropTypes from "prop-types";
import AddressPresenter from "./AddressPresenter";

class AddressContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied:false
    };

    this._copy = () => {
      this.setState(() => {
        return {
          copied:true
        }
      })
      setTimeout(() =>{
        this.setState(() => {
          return {
            copied:false
          };
        });
      }, 1000)
    }
  }

  render() {
    return <AddressPresenter {...this.props} {...this.state}
            copy={this._copy}
            copied={this.state.copied}
            />
  }
}

AddressContainer.propTypes = {};

AddressContainer.defaultProps = {
  address: PropTypes.string,
  AccountModal: PropTypes.func.isRequired,
  selectAddress: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  handleTooltip: PropTypes.func.isRequired,
  toAddress: PropTypes.string,
  amount: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AddressContainer;
