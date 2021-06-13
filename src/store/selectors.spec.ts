import type { StorageData } from "./storage-data";
import { useConversionRate, useWallet, useWalletList } from "./selectors";

const storeStub = {
  rates: {
    rates: {
      RON: 4.2,
      GBP: 0.88,
      EUR: 0.95,
    },
    loading: false,
  },
  wallets: {
    RON: {
      amount: 1500,
      currency: "RON",
    },
    USD: {
      amount: 1500,
      currency: "USD",
    },
    GBP: {
      amount: 1500,
      currency: "GBP",
    },
  },
} as StorageData;

jest.mock("react-redux", () => ({
  useSelector: (fn: (arg: any) => any) => fn(storeStub),
}));

it("should return RON for one dollar", () => {
  expect(useConversionRate("USD", "RON")).toEqual({
    value: 4.2,
    loading: false,
  });
});

it("should return RON equivalent to one british pound", () => {
  expect(useConversionRate("GBP", "RON")).toEqual({
    value: 4.2 / 0.88,
    loading: false,
  });
});
it("should return USD equivalent to one RON", () => {
  expect(useConversionRate("RON", "USD")).toEqual({
    value: 1 / 4.2,
    loading: false,
  });
});

it("should retrieve USD wallet amount", () => {
  expect(useWallet("USD")).toEqual(1500);
});

it("should retrieve the list of all wallets", () => {
  expect(useWalletList()).toEqual(Object.values(storeStub.wallets));
});
