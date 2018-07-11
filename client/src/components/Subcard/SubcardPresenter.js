import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import FontAwesome from "react-fontawesome";
import Store from "context/store";

const Notification = styled.div`
  background-color: #ffffff;
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  width: 30%;
  padding: 20px;
  border-radius: 5px;
  // margin-top: 10%;
  box-sizing: border-box;
  border: 2px solid rgba(0,0,0,.0975);
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom:15px;
`;

const Button = styled.button`
  border: 0;
  width: 150px;
  height: 5%;
  padding: 10px 0;
  color: #f5f6fa;
  background-color: #006266;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  cursor: pointer;
  margin-bottom: 5%
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
  &:active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #7f8c8d
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

const SubcardPresenter = ({ id, text }) => (
  <Notification >
    <Flex alignCenter justifyBetween>
      <Title>Network</Title>
      <FlexItem>
        <Fragment>
          <Store.Consumer>
            {store => (
              <Fragment>
                Network
              </Fragment>
            )}
          </Store.Consumer>
        </Fragment>
      </FlexItem>
    </Flex>
    <Flex alignCenter justifyBetween>
      <Title>Peer</Title>
      <FlexItem>
        <Fragment>
          <Store.Consumer>
            {store => (
              <Fragment>
                Peer
              </Fragment>
            )}
          </Store.Consumer>
        </Fragment>
      </FlexItem>
    </Flex>
    <Flex alignCenter justifyBetween>
      <Title>Last Checked</Title>
      <FlexItem>
        <Fragment>
          <Store.Consumer>
            {store => (
              <Fragment>
                Last Checked
              </Fragment>
            )}
          </Store.Consumer>
        </Fragment>
      </FlexItem>
    </Flex>

  </Notification>
);

SubcardPresenter.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default SubcardPresenter;
