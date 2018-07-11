import React, { Component } from "react";
import SubcardPresenter from "./SubcardPresenter";

class SubcardContainer extends Component {
  static propTypes = {};
  state = {};
  render() {
    return <SubcardPresenter {...this.props} {...this.state} />;
  }
}

export default SubcardContainer;
