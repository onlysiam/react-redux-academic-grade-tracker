import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "gradecount",
  initialState: [],
  reducers: {
    gradecountWindow: (gradecount, action) => {
      gradecount.push({
        id: ++lastId,
        state: false,
      });
    },
    gradecountWindowToggle: (togglegradecount, action) => {
      togglegradecount[0].state = !togglegradecount[0].state;
    },
  },
});

export const { gradecountWindow, gradecountWindowToggle } = slice.actions;
export default slice.reducer;
