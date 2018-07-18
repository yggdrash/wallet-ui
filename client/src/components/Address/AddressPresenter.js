import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import yeed from 'assets/images/yeed-symbol.png';
import Store from "context/store";

const Account = styled.button`
  width: 100%;
  height:40px;
  border: 0;
  font-size: 0.9em;
  font-weight: 250;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
    background-color:  #ecf0f1;
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


const Balance = styled.div`
  font-weight: 300;
  font-size: 1.1em;
  margin-top: ${props => (props.yeed ? "26px;" : "inherit")};
  margin-left: 5px;
  width: 15px;
`;

const AddressPresenter = ({ balance, address }) => (
    <Account

    >
      <Flex alignCenter justifyBetween>
        <FlexItem>
            <Fragment>
                {address}
            </Fragment>
        </FlexItem>
      </Flex>
    </Account>
);

AddressPresenter.propTypes = {
  address: PropTypes.array
};


export default AddressPresenter;