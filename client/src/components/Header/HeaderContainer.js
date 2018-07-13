import React, { Component } from "react";
import HeaderPresenter from "./HeaderPresenter";

class HeaderContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return <HeaderPresenter {...this.props} {...this.state} />;
  }
}


export default HeaderContainer;
