import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import Store from "context/store";

const Header = styled.header`
  height: 60px;
  background-color: #fcfcfc;
  padding: 0 40px;
  border-bottom: 1px solid rgba(0,0,0,.0975);
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  margin-bottom:30px;
  font-size: 1.5em;
  font-weight: 700;
`;

const Title = styled.div`
  color: #1C885F;
  font-family: 'Titillium Web', sans-serif
`;


const ModalHeaderPresenter = (status) => (
  <Header>
    <Flex full justifyBetween alignCenter>
      <FlexItem>
        <Store.Consumer>
            {store => (
              <Title>
                {status.myAccount ? "My Account" : "Transfer"}
              </Title>
            )}
        </Store.Consumer>
      </FlexItem>
    </Flex>
  </Header>
);

export default ModalHeaderPresenter;
