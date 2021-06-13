import CurrencyInput from "components/currency-input/currency-input.component";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { useConversionRate, useWallet } from "store/selectors";
import styled from "styled-components";

const PageContainer = styled.main`
  max-width: 800px;
  display: block;
`;

enum LastChanged {
  Source,
  Destination,
}

function useExchange(fromCurrency: string, toCurrency: string) {
  const exchangeRate = useConversionRate(fromCurrency, toCurrency);
  const [sourceAmount, setSourceAmount] = useState(0);
  const [destinationAmount, setDestinationAmount] = useState(0);

  const [lastChanged, setLastChanged] = useState(LastChanged.Source);

  const derivedDestinationAmount = useMemo(
    () => sourceAmount * exchangeRate,
    [sourceAmount, exchangeRate]
  );
  const derivedSourceAmount = useMemo(
    () => destinationAmount / exchangeRate,
    [destinationAmount, exchangeRate]
  );

  return {
    changeDestination: useCallback((value: number) => {
      setDestinationAmount(value);
      setLastChanged(LastChanged.Destination);
    }, []),
    changeSource: useCallback((value: number) => {
      setSourceAmount(value);
      setLastChanged(LastChanged.Source);
    }, []),
    sourceAmount:
      lastChanged === LastChanged.Source ? sourceAmount : derivedSourceAmount,
    destinationAmount:
      lastChanged === LastChanged.Destination
        ? destinationAmount
        : derivedDestinationAmount,
    exchangeRate,
  };
}

const VerticalFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ExchangePage(): ReactElement {
  const fromCurrency = "GBP";
  const toCurrency = "USD";

  const sourceWalletAmount = useWallet(fromCurrency);
  const destinationWalletAmount = useWallet(toCurrency);

  const exchangeData = useExchange(fromCurrency, toCurrency);
  return (
    <PageContainer>
      <VerticalFlex>
        <CurrencyInput
          amount={exchangeData.sourceAmount}
          isDestination={false}
          mainCurrency={fromCurrency}
          onChange={exchangeData.changeSource}
          walletAmount={sourceWalletAmount}
        />
        <CurrencyInput
          amount={exchangeData.destinationAmount}
          isDestination={false}
          mainCurrency={toCurrency}
          onChange={exchangeData.changeDestination}
          walletAmount={destinationWalletAmount}
        />
      </VerticalFlex>
    </PageContainer>
  );
}
