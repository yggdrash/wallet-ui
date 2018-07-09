
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import I18n from "redux-i18n";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "redux/configureStore";
import App from "components/App";
import { translations } from "translations";
const { remote } = window.require("electron");

const sharedPort = remote.getGlobal("sharedPort");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <I18n translations={translations} initialLang="en" fallbackLang="en">
      <App sharedPort={sharedPort} />
      {/* <App /> */}
      </I18n>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
