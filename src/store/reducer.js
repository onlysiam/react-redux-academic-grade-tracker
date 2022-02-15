import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import loaderReducer from "./loader";

export default combineReducers({
  entities: entitiesReducer,
  loader: loaderReducer,
});
