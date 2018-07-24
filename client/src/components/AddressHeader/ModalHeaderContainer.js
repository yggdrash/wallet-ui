import React, { Component } from "react";
import ModalHeaderPresenter from "./ModalHeaderPresenter";

class ModalHeaderContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return <ModalHeaderPresenter {...this.props} {...this.state} />;
  }
}


export default ModalHeaderContainer;
