import React, { Component } from "react";
import PropTypes from "prop-types";
import presenter from "./presenter";
import styled from "styled-components";
import logo from 'assets/images/ygg_symbol_shadow.png';
import { Title, Logo } from "components/Shared";

const Header = styled.div`
    width: 100%;
    display: flex;
    background-color: #222; 
    margin-bottom: 50px;
`;
class container extends Component {
  state = {
    network: "",
    settings: "",
    peerStatus: "",
    quit: ""
  };
  static propTypes = {
   
  };
  componentDidMount = () => {

  };

  render() {
    return (
    <Header >
        <Logo><img src={logo} alt="logo" /></Logo>
        <Title>Yggdrash Wallet</Title>
    </Header>
    );
  }
}

export default container;
