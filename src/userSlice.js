import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    loginUserRequest: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
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
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUserSuccess: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
