import { createSlice } from "@reduxjs/toolkit";
import fetchRates from "./thunks";

type Currency = string;
export interface ExchangeSlice {
  rates: Record<Currency, number>;
  loading: boolean;
}

export const counterSlice = createSlice({
  name: "rates",
  initialState: {
    rates: {
      GBP: 1.1,
      EUR: 1.05,
    },
    loading: false,
  } as ExchangeSlice,
  reducers: {},
  extraReducers: {
    [fetchRates.pending as any]: (state) => {
      state.loading = true;
    },
    [fetchRates.fulfilled as any]: (state, action) => {
      state.rates = action.payload;
      state.loading = false;
    },
  },
});

export { fetchRates };

export default counterSlice.reducer;
