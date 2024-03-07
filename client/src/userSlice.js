import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    authError: null,
    authLoading: null,
    favorites: [],
  },
  reducers: {
    sendOtpRequest: (state) => {
      state.authError = null;
      state.authLoading = true;
    },
    sendOtpSuccess: (state, action) => {
      state.authLoading = false;
      state.authMessage = action.payload;
    },
    sendOtpFailure: (state, action) => {
      state.authLoading = false;
      state.authError = action.payload;
    },

    loginUserRequest: (state) => {
      state.authError = null;
      state.authLoading = true;
    },
    loginUserSuccess: (state, action) => {
      state.authLoading = false;
      state.user = action.payload.user;
      state.favorites = state.user.favorites;
    },
    loginUserFailure: (state, action) => {
      state.authLoading = false;
      state.authError = action.payload;
      state.authMessage = action.payload.message;
    },
    loadUserRequest: (state) => {
      state.authError = null;
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.favorites = state.user.favorites;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.logoutError = action.payload;
      state.favorites = [];
    },
    logoutUserSuccess: (state) => {
      state.user = null;
      state.favorites = [];
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
  logoutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
