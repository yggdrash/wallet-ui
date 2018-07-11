import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
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
