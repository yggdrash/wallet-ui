import React, { Component } from "react";
import NetworkBoxPresenter from "./NetworkBoxPresenter";
const httppp = require("http")
class NetworkBoxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      network: {
        name:"Not connected",
        peerConnection:"",
        lastCheck:""
      },
    };

    this.componentDidMount = () => {
      this._getNetwork()
    };

    this._getNetwork = () => {
      var peerUrl = 'http://localhost:8080';
      fetch(peerUrl + '/actuator/health')
        .then(response => response.json())
        .then(json => {
          this.setState(() => {
            return {
              network: {
                name: json.details.node.details.network, 
                peerUrl: peerUrl,
                lastChecked: JSON.stringify(new Date())
              }
            }
          })
        })
        .catch(err => console.log(err)) 
    }
}

  render() {
    return <NetworkBoxPresenter {...this.props} {...this.state} 
              network={this.state.network}
          />;
  }
}

export default NetworkBoxContainer;
