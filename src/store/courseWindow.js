import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "addCourse",
  initialState: [],
  reducers: {
    courseWindow: (addCourse, action) => {
      addCourse.push({
        id: ++lastId,
        state: false,
      });
    },
    courseWindowToggle: (toggleCourse, action) => {
      toggleCourse[0].state = !toggleCourse[0].state;
    },
  },
});

export const { courseWindow, courseWindowToggle } = slice.actions;
export default slice.reducer;
