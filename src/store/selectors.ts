import { useSelector } from "react-redux";
import type { StorageData } from "./storage-data";

export function useConversionRate(fromCurrency: string, toCurrency: string) {
  return useSelector((storage: StorageData) => {
    const { rates } = storage;
    if (fromCurrency === "USD") {
      return {
        value: rates.rates[toCurrency],
        loading: rates.loading,
      };
    }

    if (toCurrency === "USD") {
      return {
        value: 1 / rates.rates[fromCurrency],
        loading: rates.loading,
      };
    }

    return {
      value: rates.rates[toCurrency] / rates.rates[fromCurrency],
      loading: rates.loading,
    };
  });
}

export function useWallet(currency: string): number {
  return useSelector((storage: StorageData) => {
    return storage.wallets[currency].amount;
  });
}

export function useWalletList(): { amount: number; currency: string }[] {
  return useSelector((storage: StorageData) => {
    return Object.values(storage.wallets);
  });
}
