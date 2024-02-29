import { createSlice } from "@reduxjs/toolkit";

export const searchMealsSlice = createSlice({
  name: "searchMeals",
  initialState: {
    meals: [],
  },
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
  },
});

export const { setMeals } = searchMealsSlice.actions;

export default searchMealsSlice.reducer;
