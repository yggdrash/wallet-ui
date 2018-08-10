import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import back from "assets/images/background.png";
import "./typography";

// const { remote } = window.require("electron");
// const sharedPort = remote.getGlobal("sharedPort");

injectGlobal`
${reset};
body{
  background-color: #F8F6F8
  background-image: url(${back});
  background-repeat: no-repeat
  background-size: cover;
}
`;

ReactDOM.render(
    //   <App sharedPort={sharedPort} />,
      <App />,
  document.getElementById("root")
);
