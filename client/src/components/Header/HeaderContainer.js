import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderPresenter from "./HeaderPresenter";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen:false,
      cogMenuHidden:true,
    };

    this.componentDidMount = () => {
      document.body.addEventListener("keydown", this.closeLastPopup)
    };

    this.closeLastPopup = e => {
      if (!(e.key === "Escape" || e.keyCode === 27)) return
      if(this.state.modalIsOpen === true){
        this.setState({ 
          modalIsOpen: !this.state.modalIsOpen,
        })
      }
     }

    this._menu = () => {
      this.setState({ 
        modalIsOpen: !this.state.modalIsOpen,
      })
    }

    this._handleOpenCloseDropdown = e => {
      if(e==="cog"){
        this.setState({
          cogMenuHidden: !this.state.cogMenuHidden
        });
      }
    };

  }
  render() {
    return <HeaderPresenter {...this.props} {...this.state} 
            modalIsOpen={this.state.modalIsOpen}
            menu={this._menu}
            handleOpenCloseDropdown={this._handleOpenCloseDropdown}
            cogMenuHidden={this.state.cogMenuHidden}
            />;
  }
}

HeaderContainer.propTypes = {};

HeaderContainer.defaultProps = {
  modalIsOpen: PropTypes.boolean,
  menu: PropTypes.func.isRequired
};

export default HeaderContainer;
