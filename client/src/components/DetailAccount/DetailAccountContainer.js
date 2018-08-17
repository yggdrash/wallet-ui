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
      editor:false,
      name:""
    };

    this.componentDidMount = () => {
      document.body.addEventListener("keydown", this.closeLastPopup);
    };
    
    this.closeLastPopup = e => {
      const { lowdb, selectAddress, showDetailAccountMenuModal } = this.props;
      if (!(e.key === "Escape" || e.keyCode === 27)) return
      if(showDetailAccountMenuModal ===true){
        this.setState({
          showDetailAccountMenuModal: !showDetailAccountMenuModal,
          editor:false
        });
      }
     }

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
