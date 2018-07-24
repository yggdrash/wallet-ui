import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import Store from "context/store";

const Header = styled.header`
  height: 60px;
  background-color: black;
  padding: 0 40px;
  border-bottom: 1px solid rgba(0,0,0,.0975);
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  margin-bottom:30px;
`;

const Title = styled.div`
  color:#508464;
  font-family: 'Titillium Web', sans-serif
  font-size: 5em;
  font-weight: 500;
`;


const ModalHeaderPresenter = () => (
  <Header>
    <Flex full justifyBetween alignCenter>
      <FlexItem>
        <Store.Consumer>
            {store => (
              <Title>
                My Account
              </Title>
            )}
        </Store.Consumer>
      </FlexItem>
    </Flex>
  </Header>
);

export default ModalHeaderPresenter;
