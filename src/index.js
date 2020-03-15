import "react-app-polyfill/ie9";
import "core-js/es/symbol";
import "core-js/es/object";
import "core-js/es/function";
import "core-js/es/parse-int";
import "core-js/es/parse-float";
import "core-js/es/number";
import "core-js/es/math";
import "core-js/es/string";
import "core-js/es/date";
import "core-js/es/array";
import "core-js/es/regexp";
import "core-js/es/map";
import "core-js/es/weak-map";
import "core-js/es/set";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { init } from "@rematch/core";

import shutter from "./models/shutter";
import setItems from "./models/setItems";
import Quiz from "./models/Quiz";
import QuizDrivers from "./models/QuizDrivers";
import city from "./models/city";

import App from "./App";

const store = init({
  models: {
    shutter,
    setItems,
    Quiz,
    QuizDrivers,
    city
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
