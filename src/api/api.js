import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  loginUserSuccess,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutUserSuccess,
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

export const sendOtp = async (email, name) => {
  try {
    const { data } = await axios.post("/api/v1/sendotp", {
      email,
      name,
    });
    return data.message;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (dispatch, name, email, otp) => {
  try {
    const { data } = await axios.post("/api/v1/login", {
      email,
      name,
      otp,
    });
    dispatch(loginUserSuccess(data.user));
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const logoutUser = async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/logout");
    dispatch(logoutUserSuccess());
    return data.message;
  } catch (error) {
    console.log(error);
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
export const addOrRemoveFav = async (dispatch, meal) => {
  try {
    const { data } = await axios.put("/api/v1/addfavorite", { meal });
    return data.message;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// img, name, id, tags = ["- -"],
