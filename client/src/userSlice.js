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
      state.authMessage = null;
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
      state.authMessage = null;
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
      state.authMessage = null;
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
    addtoFavoritesRequest: (state) => {
      state.Loading = true;
    },
    addtoFavoritesSuccess: (state, action) => {
      state.Loading = false;
      state.favorites = [...state.favorites, action.payload];
    },
    addtoFavoritesFaliure: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    removeFromFavoritesRequest: (state) => {
      state.Loading = true;
    },
    removeFromFavoritesSuccess: (state, action) => {
      state.Loading = false;
      const favArr = state.favorites.filter(
        (meal) => meal.id !== action.payload.id,
      );
      state.favorites = favArr;
    },
    removeFromFavoritesFaliure: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
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
  addtoFavoritesRequest,
  addtoFavoritesSuccess,
  addtoFavoritesFaliure,
  removeFromFavoritesRequest,
  removeFromFavoritesSuccess,
  removeFromFavoritesFaliure,
} = userSlice.actions;

export default userSlice.reducer;
