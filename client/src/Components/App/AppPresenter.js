import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const AppContainer = styled.div`
    margin: 50px 0;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AppPresenter = ({ isLoading }) => <AppContainer/>;

export default AppPresenter;