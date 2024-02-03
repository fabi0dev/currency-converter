import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./reducers/currency";

export default configureStore({
  reducer: {
    currencySlice,
  },
});
