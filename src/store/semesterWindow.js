import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "addSemester",
  initialState: [],
  reducers: {
    semesterWindow: (addSemester, action) => {
      addSemester.push({
        id: ++lastId,
        state: false,
      });
    },
    semesterWindowToggle: (toggleSemester, action) => {
      toggleSemester[0].state = !toggleSemester[0].state;
    },
  },
});

export const { semesterWindow, semesterWindowToggle } = slice.actions;
export default slice.reducer;
