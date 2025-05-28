import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: { name: "популярности", sortProperty: "rating" },

  // orderType для треугольника сортировки
  // orderType: true,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },

    // setOrderType(state) {
    //   state.orderType = 5;
    // },
  },
});

export const {
  setCategoryId,
  setSort,
  // setOrderType
} = filterSlice.actions;

export default filterSlice.reducer;
