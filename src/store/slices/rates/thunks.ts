import { createAsyncThunk } from "@reduxjs/toolkit";
import getLatestExchangeRates from "shared/endpoints";

export default createAsyncThunk("rates/fetch", (currency: string) => {
  return getLatestExchangeRates(currency);
});
