import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { authUrl, registerUrl } from "./urls";
import { userAdded } from "./users";
import { preloaderToggleFalse } from "./preloader";

const slice = createSlice({
  name: "authentication",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    authRequested: (authentication, action) => {
      authentication.loading = true;
    },
    authReceived: (authentication, action) => {
      authentication.list = action.payload;
      authentication.loading = false;
      authentication.lastFetch = Date.now();
    },

    authRequestFailed: (authentication, action) => {
      authentication.loading = false;
    },
    sessionAdded: (authentication, action) => {
      authentication.list.push(action.payload);
      authentication.loading = false;
    },
    sesssioneRemoved: (authentication, action) => {
      return authentication.list.filter(
        (course) => course.course_id !== action.payload
      );
    },
    logout: (authentication, action) => {
      const index = authentication.list.findIndex(
        (course) => course.course_id === action.payload
      );
      if (index > 0)
        authentication.list[index].active = !authentication.list[index].active;
    },
  },
});

const { authRequested, authRequestFailed } = slice.actions;
export default slice.reducer;

//Action Creator

export const login = (credentials) =>
  apiCallBegan({
    url: authUrl,
    method: "post",
    data: credentials,
    onStart: authRequested.type,
    onSuccess: userAdded.type,
    onError: preloaderToggleFalse.type,
  });

export const register = (informations) =>
  apiCallBegan({
    url: registerUrl,
    method: "post",
    data: informations,
    onStart: authRequested.type,
    onSuccess: userAdded.type,
    onError: authRequestFailed.type,
  });
