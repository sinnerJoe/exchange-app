import get from "./request";

export default function getLatestExchangeRates(baseCurrency: string) {
  return get("latest.json", {
    app_id: "bb551c40cfb94e8592644e3bdae78d1a",
    base: baseCurrency,
  });
}
