import { configureStore } from "@reduxjs/toolkit";
import searchMeals from "./searchMeals";
import { mealApi } from "./api/api";
const store = configureStore({
  reducer: {
    searchMeals,
    [mealApi.reducerPath]: mealApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealApi.middleware), // add middleware
});

export default store;
