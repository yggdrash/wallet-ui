import React, { Component } from "react";
import HeaderPresenter from "./HeaderPresenter";

class HeaderContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
        visible: false  
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({visible: !this.state.visible})
  }
  render() {
    return <HeaderPresenter {...this.state} />;
  }
}


export default HeaderContainer;
