import { createSlice } from "@reduxjs/toolkit";
import fetchRates from "./thunks";

type Currency = string;
export interface ConversionRates {
  base: Currency;
  rates: Record<Currency, number>;
}

export type ExchangeSlice = Record<Currency, ConversionRates>;

export const counterSlice = createSlice({
  name: "rates",
  initialState: {
    USD: {
      rates: { GBP: 0.9 },
      base: "USD",
    },
    GBP: {
      rates: { USD: 1.1 },
      base: "GBP",
    },
  } as ExchangeSlice,
  reducers: {},
  extraReducers: {
    [fetchRates.fulfilled as any]: (state, action) => {
      const { base, rates } = action.payload;
      state[base] = {
        base,
        rates,
      };
    },
  },
});

export { fetchRates };

export default counterSlice.reducer;
