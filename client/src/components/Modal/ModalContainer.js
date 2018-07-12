
import React, { Component } from "react";
import ModalPresenter from "./ModalPresenter";

class ModalContainer extends Component {
  static propTypes = {};
  state = {};
  render() {
    return <ModalPresenter {...this.props} {...this.state} />;
  }
}

export default ModalContainer;
