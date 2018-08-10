import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import Store from "context/store";

const Notification = styled.div`
  box-shadow: 0 7px 14px rgba(0,0,0,.0975);, 0 3px 6px rgba(0, 0, 0, 0.08);
  background-color: #F7FAF9
  width: 30%;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 2px solid rgba(0,0,0,.0975);
`;

const Title = styled.div`
  font-weight: 600;
  margin-top: ${props => (props.top ? "0px;" : "30px;")};
`;

const Value = styled.div`
  font-weight: 350;
  margin-top: ${props => (props.top ? "0px;" : "30px;")};
`;

const NetworkBoxPresenter = ({ id, text, network }) => (
  <Notification >
    <Flex alignCenter justifyBetween>
        <FlexItem>
            <Title top>Network</Title>
        </FlexItem>
      <FlexItem>
          <Store.Consumer>
            {store => (
                <Value top>{network.name}</Value>
            )}
          </Store.Consumer>
      </FlexItem>
    </Flex>
    <Flex alignCenter justifyBetween>
        <FlexItem>
            <Title>Peer</Title>
        </FlexItem>
      <FlexItem>
          <Store.Consumer>
            {store => (
                <Value>{network.peerUrl}</Value>
            )}
          </Store.Consumer>
      </FlexItem>
    </Flex>
    <Flex alignCenter justifyBetween>
        <FlexItem>
            <Title>Last Checked</Title>
        </FlexItem>
      <FlexItem>
          <Store.Consumer>
            {store => (
                <Value>{network.lastChecked}</Value>
            )}
          </Store.Consumer>
      </FlexItem>
    </Flex>

  </Notification>
);

NetworkBoxPresenter.propTypes = {
  text: PropTypes.string,
  id: PropTypes.number
};

export default NetworkBoxPresenter;
