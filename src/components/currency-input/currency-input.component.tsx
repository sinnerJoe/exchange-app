import React, { ReactElement } from "react";
import NumericInput from "components/numeric-input";
import styled from "styled-components";

interface Props {
  amount: number;
  mainCurrency: string;
  comparedCurrency?: string;
  walletAmount: number;
  onChange: (value: number) => void;
  conversionRate?: number;
  isDestination: boolean;
}

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function CurrencyInput({
  amount,
  onChange,
  walletAmount,
  comparedCurrency,
  mainCurrency,
  conversionRate,
  isDestination,
}: Props): ReactElement {
  return (
    <Flex>
      <div>
        <h2>{mainCurrency}</h2>
        <div>
          You have {mainCurrency}
          {walletAmount}
        </div>
      </div>

      <div>
        <NumericInput
          sign={isDestination ? "+" : "-"}
          value={amount}
          onChange={onChange}
        />
        {isDestination && (
          <div>
            {mainCurrency}1 = {conversionRate}
            {comparedCurrency}
          </div>
        )}
      </div>
    </Flex>
  );
}
