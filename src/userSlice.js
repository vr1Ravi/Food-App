import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    favorites: [],
  },
  reducers: {
    sendOtpRequest: (state) => {
      state.loading = true;
    },
    sendOtpSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    sendOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginUserRequest: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.message = `Welcome ${state.user.name}`;
      state.favorites = action.payload.favorites;
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.message = "";
      state.favorites = action.payload.favorites;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUserRequest: (state) => {
      state.loading = true;
    },
    logoutUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.user = null;
      state.favorites = [];
    },
    logoutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setErrMess: (state) => {
      state.message = "";
      state.error = null;
    },
  },
});

export const {
  sendOtpRequest,
  sendOtpSuccess,
  sendOtpFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
  setErrMess,
} = userSlice.actions;

export default userSlice.reducer;
