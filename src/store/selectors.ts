import { useSelector } from "react-redux";
import type { StorageData } from "./storage-data";

export function useConversionRate(
  fromCurrency: string,
  toCurrency: string
): number {
  return useSelector((storage: StorageData) => {
    return storage.rates[fromCurrency].rates[toCurrency];
  });
}

export function useWallet(currency: string): number {
  return useSelector((storage: StorageData) => {
    return storage.wallets[currency].amount;
  });
}
