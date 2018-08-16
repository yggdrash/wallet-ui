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
      editor:false
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

    this._edit = address => {
      const { lowdb } = this.props;
      // let test = lowdb.get("accounts")
      //                   .find({account.address:address})
     
      // if(this.state.editor ===true){
        
      // }
      this.setState({
        editor: !this.state.editor
      });
    }

    this._handleInput = e => {
        const { target: { name, value } } = e;
        this.setState({
          [name]: value,
        });
      };

  }

  render() {
    return <DetailAccountPresenter {...this.props} {...this.state} 
            copy={this._copy}
            top={this.state.top}
            left={this.state.left}
            copied={this.state.copied}
            copyHidden={this.state.copyHidden}
            handleTooltip={this._handleTooltip}
            edit={this._edit}
            editor={this.state.editor}
            handleInput={this._handleInput}
          />;
  }
}

export default DetailAccountContainer;
