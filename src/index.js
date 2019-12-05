import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { init } from "@rematch/core";

import setItems from "./models/setItems";
import secondAddress from "./models/secondAddress";

import App from "./App";

const store = init({
  models: {
    setItems,
    secondAddress
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
