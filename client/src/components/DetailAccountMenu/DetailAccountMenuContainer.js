import React, { Component } from "react";
import DetailAccountMenuPresenter from "./DetailAccountMenuPresenter";
class DetailAccountMenuContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    return <DetailAccountMenuPresenter {...this.props} {...this.state} 

          />;
  }
}

export default DetailAccountMenuContainer;
