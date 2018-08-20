import React, { Component } from "react";
import DetailAccountPresenter from "./DetailAccountPresenter";
class DetailAccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied:false,
      copyHidden:true,
      top: 0,
      left: 0,
      name:""
    };

    this._copy = () => {
      this.setState(() => {
        return {
          copied:true
        }
      })
      setTimeout(() =>{
        this.setState(() => {
          return {
            copied:false
          };
        });
      }, 1000)
    }

    this._handleTooltip = (ev, copyHidden) => {
      this.setState({
        top: ev.target.offsetTop + 5,
        left: ev.target.offsetLeft + ev.target.offsetWidth + 5,
        copyHidden
      });
    }
  }

  render() {
    return <DetailAccountPresenter {...this.props} {...this.state} 
            copy={this._copy}
            top={this.state.top}
            left={this.state.left}
            copied={this.state.copied}
            copyHidden={this.state.copyHidden}
            handleTooltip={this._handleTooltip}
          />;
  }
}

export default DetailAccountContainer;
