import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
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

export const loginUser = async (dispatch, name, password) => {
  try {
    dispatch(loginUserRequest());
    const { data } = await axios.post("/api/v1/login", {
      name,
      password,
    });
    dispatch(loginUserSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loginUserFailure(error.message));
  }
};
