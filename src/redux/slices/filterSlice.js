import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    // setOrderType(state) {
    //   state.orderType = 5;
    // },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  // setOrderType
} = filterSlice.actions;

export default filterSlice.reducer;
