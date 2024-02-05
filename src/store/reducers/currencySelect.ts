import { createSlice } from "@reduxjs/toolkit";

interface ICurrencySelectValues {
  code: string;
  name: string;
  name_plural: string;
  symbol: string;
  value: number;
}

interface ICurrencySelect {
  from: ICurrencySelectValues;
  to: ICurrencySelectValues;
}

const initialCurrency = {
  code: "",
  name: "",
  value: 0,
};

const initialState = {
  from: {
    ...initialCurrency,
  },
  to: initialCurrency,
};

export const slice = createSlice({
  name: "currencySelect",
  initialState,
  reducers: {
    setCurrencyFromSelect: (state, { payload }) => {
      return {
        ...state,
        from: {
          ...payload,
        },
      };
    },
    setCurrencyToSelect: (state, { payload }) => {
      return {
        ...state,
        to: {
          ...payload,
        },
      };
    },
  },
});

export const { setCurrencyFromSelect, setCurrencyToSelect } = slice.actions;
export default slice.reducer;
export const selectorCurrencySelect = (state: {
  currencySelect: ICurrencySelect;
}) => state.currencySelect;
