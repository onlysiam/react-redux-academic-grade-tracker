import { createAction, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan, credtCounted } from "./api";
import moment from "moment";
import { courseUrl, addCourseUrl, deleteCourseUrl } from "./urls";

const slice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    coursesRequested: (courses, action) => {
      courses.loading = true;
    },
    coursesReceived: (courses, action) => {
      courses.list = action.payload;
      courses.loading = false;
      courses.lastFetch = Date.now();
    },

    coursesRequestFailed: (courses, action) => {
      courses.loading = false;
    },
    courseAssignedToUser: (courses, action) => {
      const { id: courseId, userId } = action.payload;
      const index = courses.list.findIndex((course) => course.id === courseId);
      courses.list[index].userId = userId;
    },
    courseAdded: (courses, action) => {
      courses.list.push(action.payload);
      courses.loading = false;
    },
    courseResolved: (courses, action) => {
      const index = courses.list.findIndex(
        (course) => course.id === action.payload.id
      );
      courses.list[index].resolved = true;
    },
    courseRemoved: (courses, action) => {
      const list = courses.list.filter(
        (course) => course.course_id !== action.payload
      );
      return { list, loading: false, lastFetch: Date.now() };
    },
    toggleActiveCourse: (courses, action) => {
      const index = courses.list.findIndex(
        (course) => course.course_id === action.payload
      );
      console.log(courses.list[index]);
      if (index >= 0) courses.list[index].active = !courses.list[index].active;
    },

    courseGradeCount: (courses, action) => {
      const index = courses.list.findIndex(
        (course) => course.course_id === action.payload
      );
      if (index > 0) courses.list[index].active = !courses.list[index].active;
    },
    cgpaPrediction: (courses, action) => {
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
      courses.list[index].semester_gpa = (
        totalGradePoint / totalCredit
      ).toFixed(4);
    },
  },
});

const {
  courseAdded,
  courseRemoved,
  courseResolved,
  courseAssignedToUser,
  coursesReceived,
  coursesRequested,
  coursesRequestFailed,
} = slice.actions;
export default slice.reducer;

export const { toggleActiveCourse, gpaCounted } = slice.actions;
//Action Creator

export const loadcourses = (username) =>
  apiCallBegan({
    url: courseUrl,
    method: "post",
    data: username,
    onStart: coursesRequested.type,
    onSuccess: coursesReceived.type,
    onError: coursesRequestFailed.type,
  });
export const addcourse = (course) =>
  apiCallBegan({
    url: addCourseUrl,
    method: "post",
    data: course,
    onStart: coursesRequested.type,
    onSuccess: courseAdded.type,
    onError: coursesRequestFailed.type,
  });

export const removecourse = (id) =>
  apiCallBegan({
    url: deleteCourseUrl + "/" + id,
    method: "patch",
    onStart: coursesRequested.type,
    onSuccess: courseRemoved.type,
    onError: coursesRequestFailed.type,
  });

export const activeToggleCourse = (courseId) =>
  apiCallBegan({
    url: courseUrl + "/" + courseId,
    method: "patch",
    onStart: coursesRequested.type,
    onSuccess: null,
    onError: coursesRequestFailed.type,
  });

export const resolvecourse = (id) =>
  apiCallBegan({
    url: courseUrl + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: courseResolved.type,
  });
export const assigncourseToUser = (courseId, userId) =>
  apiCallBegan({
    url: courseUrl + "/" + courseId,
    method: "patch",
    data: { userId },
    onSuccess: courseAssignedToUser.type,
  });

export const getUnresolvedcourses = createSelector(
  (state) => state.entities.courses.list,
  (list) => list.filter((course) => !course.resolved)
);

export const getCourses = createSelector(
  (state) => state.entities.courses.list,
  (list) => list.filter((course) => !course.resolved)
);
export const getcoursesByUser = (userId) =>
  createSelector(
    (state) => state.entities.courses,
    (courses) => courses.filter((course) => course.userId === userId)
  );
