import React, { Component } from "react";
import SidePresenter from "./SidePresenter";

class SideContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return <SidePresenter {...this.props} {...this.state} />;
    }
}


export default SideContainer;
