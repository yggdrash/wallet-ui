import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import logo from 'assets/images/ygg-logo-green.png';
import { Wifi } from 'styled-icons/fa-solid/Wifi';
import { ExitToApp } from 'styled-icons/material/ExitToApp';
import { Location } from 'styled-icons/octicons/Location';
import { UsersCog } from 'styled-icons/fa-solid/UsersCog';
// import Store from "context/store";

const Header = styled.header`
  height: 90px;
  background-color: #ffffff;
  color: #508464;
  padding: 0 40px;
  margin-bottom: 100px;
  border-bottom: 1px solid rgba(0,0,0,.0975);
`;

const Logo = styled.div`
  width: 7%;
  margin-top:20px;
`;

const Title = styled.div`
  color: #508464;
  display: flex;
  font-family: 'Titillium Web', sans-serif
`;

const Yggdrash = styled.h5`
  color: #508464;
  display: flex;
  font-size: 1.5em;
  margin-top: 33px;
  margin-left: 20px;
`;

const Network = styled(Wifi)`
  color: black;
`

const Exit = styled(ExitToApp)`
  color: black;
`

const Peer = styled(Location)`
  color: black;
  width:17px;
`

const Cog = styled(UsersCog)`
  color: black;
`

const HeaderIcon = styled.button`
  border: 0;
  width: 35px;
  height: 40px;
  justify-content: center;
  background-color: #ffffff;
  align-items: center;
  border-radius: 10px;
  margin-right: 50px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    transform: translateY(-1px);
    background-color:  #ecf0f1;
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color:  #ecf0f1;
    transform: translateY(1px);
  }
  &:disabled {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #009432;
    transform: none;
    cursor: progress;
    &:focus,
    &:active,
    &:hover {
      transform: none;
    }
  }
`;

const HeaderPresenter = () => (
  <Header>
    <Flex full justifyBetween alignCenter>
      <FlexItem>
        <Title>
          <Logo><img src={logo} alt="logo" /></Logo>
          <Yggdrash>YGGDRASH</Yggdrash>
        </Title>
      </FlexItem>
      <FlexItem>
        <Flex>
          <HeaderIcon>
            <Network/>
          </HeaderIcon>
          <HeaderIcon>
            <Peer/>
          </HeaderIcon>
          <HeaderIcon>
            <Cog/>
          </HeaderIcon>
          <HeaderIcon>
            <Exit/>
          </HeaderIcon>
        </Flex>
      </FlexItem>
    </Flex>
  </Header>
);

export default HeaderPresenter;
