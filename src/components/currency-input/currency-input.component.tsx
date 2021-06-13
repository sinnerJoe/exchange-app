import React, { ReactElement } from "react";
import NumericInput from "components/numeric-input";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import getSymbolFromCurrency from "currency-map-symbol";

interface Props {
  amount: number;
  mainCurrency: string;
  comparedCurrency?: string;
  walletAmount: number;
  onChange: (value: number) => void;
  conversionRate?: number;
  isDestination: boolean;
  loadingExchangeRate?: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 10px;
  padding-bottom: 10px;
  color: var(--white);
`;

const SecondaryText = styled.div`
  color: var(--secondary-white);
`;

const CurrencyName = styled.h1`
  color: var(--white);
`;

const ExchangeRate = styled.div`
  color: var(--secondary-white);
  margin-top: 15px;
  margin-left: 20px;
`;

export default function CurrencyInput({
  amount,
  onChange,
  walletAmount,
  comparedCurrency,
  mainCurrency,
  conversionRate,
  isDestination,
  loadingExchangeRate,
}: Props): ReactElement {
  const mainCurrencySymbol = getSymbolFromCurrency(mainCurrency);
  const comparedCurrencySymbol = getSymbolFromCurrency(comparedCurrency);
  return (
    <Container>
      <div>
        <CurrencyName>{mainCurrency}</CurrencyName>
        <SecondaryText>
          You have {mainCurrencySymbol}
          {walletAmount.toFixed(2)}
        </SecondaryText>
      </div>

      <div>
        <NumericInput
          sign={isDestination ? "+" : "-"}
          value={amount}
          onChange={onChange}
        />
        {isDestination && !loadingExchangeRate && (
          <ExchangeRate>
            {comparedCurrencySymbol}1 = {mainCurrencySymbol}
            {conversionRate?.toFixed(2)}
          </ExchangeRate>
        )}
        {loadingExchangeRate && <LoadingOutlined />}
      </div>
    </Container>
  );
}
