import { combineReducers } from "redux";
import coursesReducer from "./courses";
import semestersReducer from "./semesters";
import usersReducer from "./users";
import projectsReducer from "./projects";
import authReducer from "./auth";

export default combineReducers({
  users: usersReducer,
  courses: coursesReducer,
  semesters: semestersReducer,
  userAuthentication: authReducer,
});
