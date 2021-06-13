import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from "./slices/rates/index";
import walletsReducer from "./slices/wallet";

export default configureStore({
  reducer: {
    rates: ratesReducer,
    wallets: walletsReducer,
  },
});
