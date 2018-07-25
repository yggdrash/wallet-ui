import React, { Component } from "react";
import AddressPresenter from "./AddressPresenter";
import Store from "context/store";

class AddressContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    return <AddressPresenter {...this.props} {...this.state}/>
  }
}

AddressContainer.propTypes = {};

export default AddressContainer;
