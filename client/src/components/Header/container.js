import React, { Component } from "react";
import PropTypes from "prop-types";
import presenter from "./presenter";
import styled from "styled-components";
import logo from 'assets/images/ygg-logo-green.png';
import { Wifi } from 'styled-icons/fa-solid/Wifi';

import { Title, Logo } from "components/Shared";

const Header = styled.div`
    width: 100%;
    display: flex;
    background-color: #f5f6fa
    margin-bottom: 3%;
    BottomColor: black;
    border-bottom: 1px solid rgba(0,0,0,.0975);
`;

export const Network = styled(Wifi)`
  width: 2%
  margin-left: 60%;
  color: white;
`
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
        <Title>YGGDRASH</Title>
    </Header>
    );
  }
}

export default container;
