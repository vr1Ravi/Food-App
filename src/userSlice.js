import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    favorites: [],
  },
  reducers: {
    loginUserRequest: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.favorites = action.payload.favorites;
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginUserRequest, loginUserSuccess, loginUserFailure } =
  userSlice.actions;

export default userSlice.reducer;
