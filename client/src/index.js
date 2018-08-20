import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import back from "assets/images/background1.jpg";
import "./typography";

const { remote } = window.require("electron");
const sharedPort = remote.getGlobal("sharedPort");
const lowdb = remote.getGlobal("lowdb");


injectGlobal`
${reset};
body{
  background-image: url(${back});
  background-repeat: no-repeat
  background-size: cover;
  font-family:'Roboto', sans-serif
}
`;

ReactDOM.render(
      <App 
        sharedPort={sharedPort} 
        lowdb={lowdb}
        />,
      // <App />,
  document.getElementById("root")
);
