import { createAction, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan, credtCounted } from "./api";
import moment from "moment";
import { courseUrl, addCourseUrl, deleteCourseUrl } from "./urls";

const slice = createSlice({
  name: "calculator",
  initialState: {
    courseInputList: [],
    resultList: [],
  },
  reducers: {
    calculatorAdded: (calculator, action) => {
      calculator.courseInputList = action.payload;
      calculator.resultList = action.payload;
    },
    courseAdded: (calculator, action) => {
      calculator.courseInputList.push(action.payload);
    },
    resultAdded: (calculator, action) => {
      calculator.resultList.push(action.payload);
    },
  },
});

export const { calculatorAdded, courseAdded, resultAdded } = slice.actions;
export default slice.reducer;
