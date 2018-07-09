import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import logo from 'assets/images/ygg_symbol_shadow.png';
import { Title, Logo } from "components/Shared";

const Header = styled.div`
  margin: 50px 0;
  width: 90%;
  display: flex;
  background-color: #222; 
`;
const presenter = (props, context) => (
    <Header >
        <Logo><img src={logo} alt="logo" /></Logo>
        <Title>Yggdrash Wallet</Title>
    </Header>
  );
  
  presenter.propTypes = {

  };
  
  export default presenter;