import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import { mealApi } from "./api/api";
const store = configureStore({
  reducer: {
    user,
    [mealApi.reducerPath]: mealApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealApi.middleware), // add middleware
});

export default store;
