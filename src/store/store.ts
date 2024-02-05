import { combineReducers, configureStore } from "@reduxjs/toolkit";
import latestSlice from "./reducers/latest";
import localforage from "localforage";
import { persistReducer } from "redux-persist";

const currencyPersistConfig = {
  key: "latest",
  storage: localforage,
  safelist: ["latest"],
};

const reducers = combineReducers({
  latestSlice,
});

const persistedReducer = persistReducer(currencyPersistConfig, reducers);

export default configureStore({
  reducer: {
    persistedReducer,
  },
});
