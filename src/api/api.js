import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  sendOtpRequest,
  sendOtpSuccess,
  sendOtpFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
} from "../userSlice";
export const mealApi = createApi({
  reducerPath: "mealApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    fetchMeals: builder.query({
      query: (term) => {
        if (term.trim() === "") return [];
        return `search.php?s=${term}`;
      },

      transformResponse: (response) => (response.meals ? response.meals : []),
    }),

    fetchMealById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
      transformResponse: (response) => {
        return response.meals ? response.meals[0] : {};
      },
    }),

    fetchMealByType: builder.query({
      query: (query) => `filter.php?${query.type}=${query.value}`,
      transformResponse: (response) => {
        return response.meals ? response.meals : [];
      },
    }),
  }),
});
export const {
  useFetchMealsQuery,
  useFetchMealByIdQuery,
  useFetchMealByTypeQuery,
} = mealApi;

export const sendOtp = async (dispatch, email, name) => {
  try {
    dispatch(sendOtpRequest());
    const { data } = await axios.post("/api/v1/sendotp", {
      email,
      name,
    });
    dispatch(sendOtpSuccess(data.message));
  } catch (error) {
    console.log(error);
    dispatch(sendOtpFailure(error.message));
  }
};

export const login = async (dispatch, name, email, otp) => {
  try {
    dispatch(loginUserRequest());
    const { data } = await axios.post("/api/v1/login", {
      email,
      name,
      otp,
    });
    dispatch(loginUserSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loginUserFailure(error.message));
  }
};
export const logoutUser = async (dispatch) => {
  try {
    dispatch(logoutUserRequest());
    const { data } = await axios.get("/api/v1/logout");
    dispatch(loginUserSuccess(data.message));
  } catch (error) {
    console.log(error);
    dispatch(logoutUserFailure(error.message));
  }
};
export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get("/api/v1/me");
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loadUserFailure());
  }
};
