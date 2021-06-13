import type { ExchangeSlice } from "./slices/rates";
import type { WalletSlice } from "./slices/wallet";

export interface StorageData {
  rates: ExchangeSlice;
  wallets: WalletSlice;
}
