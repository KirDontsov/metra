import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { init } from "@rematch/core";

import setItems from "./models/setItems";
import Quiz from "./models/Quiz";

import App from "./App";

const store = init({
  models: {
    setItems,
    Quiz
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
