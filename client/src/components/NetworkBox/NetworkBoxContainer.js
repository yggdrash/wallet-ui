import React, { Component } from "react";
import NetworkBoxPresenter from "./NetworkBoxPresenter";

class NetworkBoxContainer extends Component {
  static propTypes = {};
  state = {};
  render() {
    return <NetworkBoxPresenter {...this.props} {...this.state} />;
  }
}

export default NetworkBoxContainer;
