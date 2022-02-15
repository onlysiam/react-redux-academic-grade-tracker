import { combineReducers } from "redux";
import semesterWindowReducer from "./semesterWindow";
import courseWindowReducer from "./courseWindow";
import preloaderReducer from "./preloader";

export default combineReducers({
  preloader: preloaderReducer,
  semesterWindow: semesterWindowReducer,
  courseWindow: courseWindowReducer,
});
