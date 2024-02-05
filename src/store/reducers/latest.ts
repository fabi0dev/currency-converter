import { createSlice } from "@reduxjs/toolkit";

interface ILatest {
  data: [];
}
const initialState = {
  data: {},
};

export const slice = createSlice({
  name: "latest",
  initialState,
  reducers: {
    setLatest: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setLatest } = slice.actions;
export default slice.reducer;
export const selectorLatest = (state: { latest: ILatest }) => state.latest;
