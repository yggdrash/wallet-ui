import React, { Fragment }  from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import logo from 'assets/images/ygg-logo-green.png';
import { Menu } from 'styled-icons/feather/Menu';
import { UsersCog } from 'styled-icons/fa-solid/UsersCog';
import ReactModal from 'react-modal';
import Store from "context/store";
import textLogo from "assets/images/yggdrash-text-logo.png";
import chains from "assets/images/blockchain2.png";
import accounts from "assets/images/account.png";
import { Close } from "styled-icons/material/Close"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from 'styled-dropdown-component';


const Header = styled.header`
  height: 80px;
  background-color: #141414
  color: #508464;
  padding: 0 40px;
  border-bottom: 1px solid rgba(0,0,0,.0975);
  margin-bottom: 78px;
`;
const Side = styled.div`

`;
const Logo = styled.div`
  width: 45px;
  margin-top:24px;
`;

const Title = styled.div`
  color: #508464;
  display: flex;
  font-family: 'Roboto', sans-serif
`;
const Yggdrash = styled.div`
  margin-left: 15px;
  width: 160px;
  margin-top:40px;
`;
const MenuIcon = styled(Menu)`
  width:17px;
  color: #FCFCFC;
`
const Cog = styled(UsersCog)`
  color: #FCFCFC;
`
const CloseIcon = styled(Close)`
  color: #FCFCFC;
  width:17px;
`
const HeaderIcon = styled.button`
  border: none;
  width: ${props => (props.network ? "70px;" : "35px")}
  height: 40px;
  color: #FCFCFC;
  justify-content: center;
  background-color: #141414;
  align-items: center;
  border-radius: 10px;
  margin-top: ${props => (props.close ? "20px" : "inherit")}
  margin-left: ${props => (props.close ? "70px" : "50px;")}
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    transform: translateY(-1px);
    background-color:  #b2bec3
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
const SideMenuIcon = styled.button`
  border: none;
  width: 75px;
  height:${props =>(props.chain ? "70px" :" 65px;")}
  color: #FCFCFC;
  justify-content: center;
  background-color: #141414;
  align-items: center;
  border-radius: 10px;
  margin-top: 50px;
  cursor: pointer;
  color: #fafafa;
  transition: all 0.2s ease-out;
  position: relative;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    transform: translateY(-1px);
    background-color:  #b2bec3
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
const Version = styled.div`
  margin-top:49px;
  margin-left:10px;
`
const MenuModal = styled(ReactModal)`
  border: 0;
  width: 50%;
  height: 100%;
  position: absolute;
  background-color: #141414;
  border: 2px solid rgba(0,0,0,.0975);
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  border-color: rgba(70, 219, 115, 0);
  &:focus,
  &:active {
    outline: none;
  }

  -webkit-animation: mymove 0.5s;  
  -webkit-animation-fill-mode: forwards;
  animation: mymove 0.5s;
  animation-fill-mode: forwards;
  @-webkit-keyframes mymove {
    from {
      margin-left: 100%;
      width: 10%
    }
  
    to {
      margin-left: 90%;
      width: 10%;
    }
  }
  @keyframes mymove {
    from {
      margin-left: 100%;
      width: 10%
    }
  
    to {
      margin-left: 90%;
      width: 10%;
    }
  }
`

const HeaderPresenter = ({ modalIsOpen, menu }) => (
  <Fragment>
    <Header>
      <Flex full justifyBetween alignCenter>
        <FlexItem>
          <Title>
            <Fragment><Logo><img src={logo} alt="logo" /></Logo></Fragment>
            <Fragment><Yggdrash><img src={textLogo} alt="logo" /></Yggdrash></Fragment>
            <Version>v 0.0.1</Version>
          </Title>
        </FlexItem>
        <FlexItem>
          <Store.Consumer>
          {store => (
            <Flex>
              <HeaderIcon network>
                TESTNET
              </HeaderIcon>
              <Dropdown>
                <HeaderIcon
                  secondary
                  dropdownToggle
                  onClick={() => store.handleOpenCloseDropdown("cog")}
                >
                  <Cog/>
                </HeaderIcon>
                <DropdownMenu 
                    hidden={store.cogMenuHidden}
                    mt="15px"
                >
                  <DropdownItem py="10px">Recovery Account</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <HeaderIcon
                onClick={() => menu()}
              >
                <MenuIcon/>
              </HeaderIcon>
            </Flex>
          )}
          </Store.Consumer>
        </FlexItem>
      </Flex>
    </Header>
      <Side>
        <MenuModal
            isOpen={modalIsOpen}
            style={{
              content: {
                color: 'black'
              }
            }}
          >
          <Flex>
            <HeaderIcon close
              onClick={() => menu()}
            >
              <CloseIcon/>
            </HeaderIcon>
          </Flex>
          <Flex alignCenter full column>
            <SideMenuIcon chain>
              <img src={chains} alt="chains" />
              CHAINS
            </SideMenuIcon>
            <SideMenuIcon account>
              <img src={accounts} alt="accounts" />
              ACCOUNTS
            </SideMenuIcon>
          </Flex>
        </MenuModal>
      </Side>
  </Fragment>
);

export default HeaderPresenter;
