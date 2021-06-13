import { fetchRates } from "store/slices/rates";
import { useConversionRate } from "store/selectors";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export function useExchangeRatePoller() {
  const dispatch = useDispatch();
  const intervalRef = useRef<any>();

  useEffect(() => {
    dispatch(fetchRates());
    intervalRef.current = setInterval(() => {
      dispatch(fetchRates());
    }, 10000);
    return () => clearInterval(intervalRef.current);
  }, []);
}

enum LastChanged {
  Source,
  Destination,
}
export function useExchange(fromCurrency: string, toCurrency: string) {
  const exchangeRate = useConversionRate(fromCurrency, toCurrency);
  const [sourceAmount, setSourceAmount] = useState(0);
  const [destinationAmount, setDestinationAmount] = useState(0);

  const [lastChanged, setLastChanged] = useState(LastChanged.Source);

  const derivedDestinationAmount = useMemo(
    () => sourceAmount * exchangeRate.value,
    [sourceAmount, exchangeRate]
  );
  const derivedSourceAmount = useMemo(
    () => destinationAmount / exchangeRate.value,
    [destinationAmount, exchangeRate]
  );

  const changeDestination = useCallback((value: number) => {
    setDestinationAmount(value);
    setLastChanged(LastChanged.Destination);
  }, []);

  const changeSource = useCallback((value: number) => {
    setSourceAmount(value);
    setLastChanged(LastChanged.Source);
  }, []);

  return {
    changeSource,
    changeDestination,
    sourceAmount:
      lastChanged === LastChanged.Source ? sourceAmount : derivedSourceAmount,
    destinationAmount:
      lastChanged === LastChanged.Destination
        ? destinationAmount
        : derivedDestinationAmount,
    exchangeRate: exchangeRate.value,
    loading: exchangeRate.loading,
  };
}
