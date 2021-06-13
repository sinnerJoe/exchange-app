import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Wallet {
  currency: string;
  amount: number;
}

export type WalletSlice = Record<string, Wallet>;

interface CurrencyAmountPayload {
  currency: string;
  amount: number;
}

export const walletSlice = createSlice({
  name: "wallets",
  initialState: {
    GBP: {
      currency: "GBP",
      amount: 500,
    },
    USD: {
      currency: "USD",
      amount: 1000,
    },
  } as WalletSlice,
  reducers: {
    decreaseBy: (
      state,
      { payload: { amount, currency } }: PayloadAction<CurrencyAmountPayload>
    ) => {
      state[currency].amount -= amount;
    },
    increaseBy: (
      state,
      { payload: { amount, currency } }: PayloadAction<CurrencyAmountPayload>
    ) => {
      state[currency].amount += amount;
    },
  },
});

export const { decreaseBy, increaseBy } = walletSlice.actions;
export default walletSlice.reducer;
