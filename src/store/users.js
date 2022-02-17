import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    authenticated: false,
    lastFetch: null,
  },
  reducers: {
    userAdded: (users, action) => {
      users.list.push(action.payload[0]);
      users.authenticated = true;
      localStorage.setItem("cgpa101Username", action.payload[0].username);
      localStorage.setItem("cgpa101Password", action.payload[0].password);
    },
    userLogout: (users, action) => {
      users.authenticated = false;
      users.list = [];
    },
    userRemoved: (users, action) => {
      users.list.filter((user) => user.id !== action.payload.id);
    },
    creditCounted: (users, action) => {
      let totalCredit = 0;
      for (let i = 0; i < action.payload.length; i++) {
        if (action.payload[i].active) {
          totalCredit = totalCredit + parseFloat(action.payload[i].credit_hour);
        }
      }
      users.list[0].credit_completed = totalCredit;
    },
    cgpaCounted: (users, action) => {
      let totalCredit = 0;
      let totalGradePoint = 0;
      for (let i = 0; i < action.payload.length; i++) {
        if (action.payload[i].active) {
          totalCredit = totalCredit + parseFloat(action.payload[i].credit_hour);
          totalGradePoint =
            totalGradePoint +
            parseFloat(action.payload[i].credit_hour) *
              parseFloat(action.payload[i].grade_point);
        }
      }
      let cgpa;
      if (totalCredit > 0) cgpa = (totalGradePoint / totalCredit).toFixed(2);
      else cgpa = 0;
      users.list[0].cgpa = cgpa;
    },
  },
});

export const {
  userAdded,
  userRemoved,
  userLogout,
  creditCounted,
  cgpaCounted,
} = slice.actions;
export default slice.reducer;
