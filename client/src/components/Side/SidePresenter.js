import React, { Fragment } from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
// import Store from "context/store";

const Header = styled.header`
  margin-top: 100px;
  width:20%;
  height:70px;
  font-size: 1.8em;
  background-color: #ffffff;
  padding: 0 40px;
  // border-bottom: 1px solid rgba(0,0,0,.0975);
  border-right: 1.5px solid rgba(0,0,0,.0975);
`;

const Title = styled.div`
  font-family: 'Titillium Web', sans-serif
  margin-top: 30px;
`;

const Body = styled.body`
  height:100%;
  width:20%;
  background-color: #ffffff;
  font-size: 1.8em;
  padding: 0 40px;
  border-right: 1.5px solid rgba(0,0,0,.0975);
`;


const SidePresenter = () => (
    <Fragment>
        <Header>
            <Flex full justifyBetween alignCenter>
                <FlexItem>
                    <Title>
                       My Accounts
                    </Title>
                </FlexItem>
            </Flex>
        </Header>
        <Flex>
            <Body>

            asd
            </Body>
        </Flex>
    </Fragment>

);

export default SidePresenter;
