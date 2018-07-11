import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import { injectGlobal } from "styled-components";
import { translations } from "translations";
import "./typography";
import reset from "styled-reset";

const { remote } = window.require("electron");
const sharedPort = remote.getGlobal("sharedPort");

injectGlobal`
${reset};
@font-face {
  font-family: 'Operator Mono';
  src: url('../fonts/Operator-Mono.ttf');
}
body{
    background-color:#FAFAFA;
}`;


ReactDOM.render(
      <App sharedPort={sharedPort} />,
  document.getElementById("root")
);
