import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const latestSlice = createSlice({
  name: "latest",
  initialState,
  reducers: {
    setDataLatest: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setDataLatest } = latestSlice.actions;
export default latestSlice.reducer;
