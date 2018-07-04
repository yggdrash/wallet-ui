
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
const { remote } = window.require("electron");

const sharedPort = remote.getGlobal("sharedPort");

ReactDOM.render(
  <App sharedPort={sharedPort} />,
  document.getElementById("root")
);