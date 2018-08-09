import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
// import App from "components/Main";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import "./typography";

// const { remote } = window.require("electron");
// const sharedPort = remote.getGlobal("sharedPort");

injectGlobal`
${reset};
body{
    background-color:#FAFAFA;
}`;

ReactDOM.render(
    //   <App sharedPort={sharedPort} />,
      <App />,
  document.getElementById("root")
);
