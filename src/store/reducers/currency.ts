import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setDataCurrency: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setDataCurrency } = counterSlice.actions;
export default counterSlice.reducer;
