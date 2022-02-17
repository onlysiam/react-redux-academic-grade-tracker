import { combineReducers } from "redux";
import calculatorReducer from "./calculator";
import coursesReducer from "./courses";
import semestersReducer from "./semesters";
import usersReducer from "./users";
import gradeReducer from "./gradeweights";
import authReducer from "./auth";

// export default combineReducers({
//   users: usersReducer,
//   courses: coursesReducer,
//   semesters: semestersReducer,
//   grades: gradeReducer,
//   userAuthentication: authReducer,
// });

const appReducer = combineReducers({
  users: usersReducer,
  courses: coursesReducer,
  semesters: semestersReducer,
  grades: gradeReducer,
  userAuthentication: authReducer,
  calculator: calculatorReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "users/userLogout") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
