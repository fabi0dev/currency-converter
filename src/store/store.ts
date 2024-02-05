import { combineReducers, configureStore } from "@reduxjs/toolkit";
import latest from "./reducers/latest";
import currencySelect from "./reducers/currencySelect";
import localforage from "localforage";
import { persistReducer, persistStore } from "redux-persist";

const currencyPersistConfig = {
  key: "latest",
  storage: localforage,
  safelist: ["latest", "currencySelect"],
};

const all = combineReducers({
  latest,
  currencySelect,
});

const reducers = persistReducer(currencyPersistConfig, all);

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { store, persistor };
