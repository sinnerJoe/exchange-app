import { createAsyncThunk } from "@reduxjs/toolkit";
import getLatestExchangeRates from "shared/endpoints";

export default createAsyncThunk("rates/fetch", () => {
  return getLatestExchangeRates().then((exchangeRatesResponse: any) => {
    console.log("req", exchangeRatesResponse);
    return exchangeRatesResponse.data.rates;
  });
});
