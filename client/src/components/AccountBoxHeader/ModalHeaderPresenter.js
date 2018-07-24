import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import Store from "context/store";

const Header = styled.header`
  height: 60px;
  background-color: black;
  color:  #508464;
  padding: 0 40px;
  border-bottom: 1px solid rgba(0,0,0,.0975);
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  margin-bottom:40px;
`;

const Title = styled.div`
  color:#508464;
  font-family: 'Titillium Web', sans-serif
`;


const ModalHeaderPresenter = () => (
  <Header>
    <Flex full justifyBetween alignCenter>
      <FlexItem>
        <Store.Consumer>
            {store => (
              <Title>
                {store.statusModal === "create" ? `CREATE ACCOUNT` :`IMPORT ACCOUNT`}
              </Title>
            )}
        </Store.Consumer>
      </FlexItem>
    </Flex>
  </Header>
);

export default ModalHeaderPresenter;
