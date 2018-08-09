import React, { Fragment }  from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import logo from 'assets/images/ygg-logo-green.png';
import { Wifi } from 'styled-icons/fa-solid/Wifi';
import { ExitToApp } from 'styled-icons/material/ExitToApp';
import { Location } from 'styled-icons/octicons/Location';
import { UsersCog } from 'styled-icons/fa-solid/UsersCog';
import Store from "context/store";
import textLogo from "assets/images/yggdrash-text-logo.png";
import {
  Dropdown,
  DropdownItem,
  DropdownDivider,
  DropdownMenu,
} from 'styled-dropdown-component';
import {
  Alert,
  AlertHeading,
} from 'styled-alert-component';
import {
  Tooltip,
  TooltipArrow,
  TooltipInner,
} from 'styled-tooltip-component';


const Header = styled.header`
  height: 90px;
  background-color: #ffffff;
  color: #508464;
  padding: 0 40px;
  border-bottom: 1px solid rgba(0,0,0,.0975);
`;
const Menu = styled.header`
  height: 60px;
  color: #508464;
  padding: 0 40px;
  margin-bottom: 40px;
`;
const Logo = styled.div`
  width: 4%;
  margin-top:20px;
`;

const Title = styled.div`
  color: #508464;
  display: flex;
  font-family: 'Titillium Web', sans-serif
`;
const Yggdrash = styled.div`
  margin-left: 15px;
  width: 15%;
  margin-top:35px;
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
  border: none;
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
const Version = styled.div`
  margin-top:45px;
  margin-left:10px;
`
const MunuBtn = styled.button`
  border: 0;
  width: 150px;
  height: 40px;
  justify-content: center;
  background-color: #fafafa;
  align-items: center;
  margin-top: 10px;
  margin-right: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size:1.1em;
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
    transform: translateY(1px);
  }
`;

const HeaderPresenter = () => (
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
              <Dropdown>
                <HeaderIcon
                  secondary
                  dropdownToggle
                  onClick={() => store.handleOpenCloseDropdown("network")}
                  onMouseEnter={(ev) => store.handleTooltip(ev, false)}
                  onMouseLeave={(ev) => store.handleTooltip(ev, true)}
                >
                  <Network/>
                  {/* <Tooltip
                    hidden={store.iconHidden}
                    style={{
                      top: `${store.top}px`,
                      left: `${store.left}px`
                    }}
                    bottom={true}
                  >
                    <TooltipArrow bottom={true} />
                    <TooltipInner bottom={true}>Network</TooltipInner>
                  </Tooltip> */}
                </HeaderIcon>
                <DropdownMenu 
                  hidden={store.netMenuHidden}
                  mt="15px"
                >
                  <DropdownItem py="10px">MAINNET</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem py="10px">TESTNET</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <HeaderIcon>
                <Peer/>
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
              <HeaderIcon>
                <Exit/>
              </HeaderIcon>
            </Flex>
          )}
          </Store.Consumer>
        </FlexItem>
      </Flex>
    </Header>
    <Menu>
      <Flex full justifyBetween alignCenter>
        <FlexItem>
          <Title>

          </Title>
        </FlexItem>
        {/* <FlexItem>
          <Store.Consumer>
          {store => (
            <Flex>
              <MunuBtn click>
                CHAIN
              </MunuBtn>
              <MunuBtn >
                ACCOUNTS
              </MunuBtn>
            </Flex>
          )}
          </Store.Consumer>
        </FlexItem> */}
      </Flex>
    </Menu>
  </Fragment>
);

export default HeaderPresenter;
