import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

interface pizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: pizzaSliceState = {
  items: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (
    params
    // : Record<string, string>
  ) => {
    const { currentPage, categoryId, sortType, orderType } = params;

    const { data } = await axios.get(
      `https://6811c5a73ac96f7119a58412.mockapi.io/items?page=${currentPage}&limit=${4}&category=${categoryId}&sortBy=${sortType}&order=${
        orderType ? "desc" : "asc"
      }
        `
    );
    return data;
    // as CartItem[]
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
