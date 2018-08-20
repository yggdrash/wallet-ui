import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import Store from "context/store";

const Header = styled.header`
  height: 60px;
  background-color:transparent
  padding: 0 40px;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  margin-bottom:40px;
  font-weight: 700;
`;

const Title = styled.div`
  color: #fcfcfc
  font-style: italic;
  font-family: 'Roboto', sans-serif
`;


const ModalHeaderPresenter = () => (
  <Header>
    <Flex full justifyBetween alignCenter>
      <FlexItem>
        <Store.Consumer>
            {store => (
              <Title>
                {store.statusModal === "password" || store.statusModal === "create" || store.statusModal === "confirm" ? `CREATE ACCOUNT` :`IMPORT ACCOUNT`}
              </Title>
            )}
        </Store.Consumer>
      </FlexItem>
    </Flex>
  </Header>
);

export default ModalHeaderPresenter;
