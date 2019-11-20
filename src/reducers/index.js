import { combineReducers } from "redux";
import cars from "./cars";
import coords from "./coords";

export default combineReducers({
  cars,
  coords
});
