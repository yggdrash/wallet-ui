import React, { Component } from "react";
import txReceiptPresenter from "./txReceiptPresenter";

class txReceiptContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <txReceiptPresenter {...this.props} {...this.state} 
          />;
  }
}

export default txReceiptContainer;
