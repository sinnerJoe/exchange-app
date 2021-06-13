import get from "./request";

interface ExchangeRatesResponse {
  rates: Record<string, number>;
}

export default function getLatestExchangeRates() {
  // eslint-disable-next-line camelcase
  return get<ExchangeRatesResponse, { app_id: string }>("latest.json", {
    app_id: "bb551c40cfb94e8592644e3bdae78d1a",
  });
}
