import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import { semesterUrl, addSemesterUrl, deleteSemestereUrl } from "./urls";
import moment from "moment";

const slice = createSlice({
  name: "semesters",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    semestersRequested: (semesters, action) => {
      semesters.loading = true;
    },
    semestersReceived: (semesters, action) => {
      semesters.list = action.payload;
      semesters.loading = false;
      semesters.lastFetch = Date.now();
    },

    semestersRequestFailed: (semesters, action) => {
      semesters.loading = false;
    },
    semesterAssignedToUser: (semesters, action) => {
      const { id: semesterId, userId } = action.payload;
      const index = semesters.list.findIndex(
        (semester) => semester.id === semesterId
      );
      semesters.list[index].userId = userId;
    },
    semesterAdded: (semesters, action) => {
      semesters.list.push(action.payload);
      semesters.loading = false;
    },
    semesterResolved: (semesters, action) => {
      const index = semesters.list.findIndex(
        (semester) => semester.id === action.payload.id
      );
      semesters.list[index].resolved = true;
    },
    semesterRemoved: (semesters, action) => {
      const list = semesters.list.filter(
        (semester) => semester.semester_id !== action.payload
      );
      return { list, loading: false, lastFetch: Date.now() };
    },
    semesterRemovedState: (semesters, action) => {
      semesters.loading = false;
    },

    gpaCounted: (semesters, action) => {
      let totalCredit = 0;
      let totalGradePoint = 0;
      let index = parseInt(action.payload.pathId);
      for (let i = 0; i < action.payload.courses.length; i++) {
        if (action.payload.courses[i].active) {
          totalCredit =
            totalCredit + parseFloat(action.payload.courses[i].credit_hour);
          totalGradePoint =
            totalGradePoint +
            parseFloat(action.payload.courses[i].credit_hour) *
              parseFloat(action.payload.courses[i].grade_point);
        }
      }
      semesters.list[index].semester_gpa = (
        totalGradePoint / totalCredit
      ).toFixed(4);
    },
    semesterCreditCounted: (semesters, action) => {
      let totalCredit = 0;
      let index = parseInt(action.payload.pathId);
      for (let i = 0; i < action.payload.courses.length; i++) {
        if (action.payload.courses[i].active) {
          totalCredit =
            totalCredit + parseFloat(action.payload.courses[i].credit_hour);
        }
      }
      semesters.list[index].semester_credit = totalCredit;
    },
  },
});

const {
  semesterAdded,
  semesterRemoved,
  semesterResolved,
  semesterAssignedToUser,
  semestersReceived,
  semestersRequested,
  semestersRequestFailed,
} = slice.actions;
export default slice.reducer;
export const { semesterRemovedState, gpaCounted, semesterCreditCounted } =
  slice.actions;
//Action Creator

export const loadsemesters = (username) =>
  apiCallBegan({
    url: semesterUrl,
    method: "post",
    data: username,
    onStart: semestersRequested.type,
    onSuccess: semestersReceived.type,
    onError: semestersRequestFailed.type,
  });
export const addsemester = (semester) =>
  apiCallBegan({
    url: addSemesterUrl,
    method: "post",
    data: semester,
    onStart: semestersRequested.type,
    onSuccess: semesterAdded.type,
    onError: semestersRequestFailed.type,
  });
export const removesemester = (id) =>
  apiCallBegan({
    url: deleteSemestereUrl + "/" + id,
    method: "patch",
    onStart: semestersRequested.type,
    onSuccess: semesterRemoved.type,
    onError: semestersRequestFailed.type,
  });
export const resolvesemester = (id) =>
  apiCallBegan({
    url: semesterUrl + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: semesterResolved.type,
  });
export const assignsemesterToUser = (semesterId, userId) =>
  apiCallBegan({
    url: semesterUrl + "/" + semesterId,
    method: "patch",
    data: { userId },
    onSuccess: semesterAssignedToUser.type,
  });

//selectors
export const getUnresolvedsemesters = createSelector(
  (state) => state.entities.semesters.list,
  (list) => list.filter((semester) => !semester.resolved)
);
export const getSemesters = createSelector(
  (state) => state.entities.semesters.list
);
export const getsemestersByUser = (userId) =>
  createSelector(
    (state) => state.entities.semesters,
    (semesters) => semesters.filter((semester) => semester.userId === userId)
  );
