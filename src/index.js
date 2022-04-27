import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import store from "./redux/configureStore";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

