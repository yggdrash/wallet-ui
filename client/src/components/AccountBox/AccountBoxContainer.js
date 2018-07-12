import React, { Component } from "react";
import AccountBoxPresenter from "./AccountBoxPresenter";
// import Store from "context/store";

class AccountBoxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return <AccountBoxPresenter {...this.props} {...this.state} />;
  }
}

AccountBoxContainer.propTypes = {};

export default AccountBoxContainer;
