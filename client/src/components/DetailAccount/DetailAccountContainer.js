import React, { Component } from "react";
import DetailAccountPresenter from "./DetailAccountPresenter";
// import Store from "context/store";

class DetailAccountContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return <DetailAccountPresenter {...this.props} {...this.state} />;
    }
}

DetailAccountContainer.propTypes = {};

export default DetailAccountContainer;
