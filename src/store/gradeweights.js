import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { defaultGradeUrl, userGradeUrl } from "./urls";

const slice = createSlice({
  name: "grades",
  initialState: [],
  reducers: {
    gradeAdded: (grades, action) => {
      grades.push(action.payload);
    },
  },
});

export const { gradeAdded } = slice.actions;
export default slice.reducer;

//Action Creator

export const loadDefaultGrade = () =>
  apiCallBegan({
    url: defaultGradeUrl,
    method: "get",
    onSuccess: gradeAdded.type,
  });
export const loadUserGrade = (username) =>
  apiCallBegan({
    url: userGradeUrl,
    method: "post",
    data: username,
    onSuccess: gradeAdded.type,
  });
