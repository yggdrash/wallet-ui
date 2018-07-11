import React, { Component } from "react";
import MaincardPresenter from "./MaincardPresenter";

class MaincardContainer extends Component {
  static propTypes = {};
  state = {};
  render() {
    return <MaincardPresenter {...this.props} {...this.state} />;
  }
}

export default MaincardContainer;
