import { createSlice } from "@reduxjs/toolkit";

interface ICurrency {
  data: [];
}

const initialState = {
  data: {},
};

export const slice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, { payload }) => {
      return {
        ...payload,
      };
    },
  },
});

export const { setCurrency } = slice.actions;
export default slice.reducer;
export const selectorCurrency = (state: { currency: ICurrency }) =>
  state.currency;
