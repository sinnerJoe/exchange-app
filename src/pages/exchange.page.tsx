import CurrencyInput from "components/currency-input/currency-input.component";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { useWalletList } from "store/selectors";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button, Carousel } from "antd";
import "antd/lib/carousel/style/css";
import "antd/lib/button/style/css";
import { CarouselRef } from "antd/lib/carousel";

import { decreaseBy, increaseBy } from "store/slices/wallet";
import Center from "components/layout/center";
import SeparatorLining from "components/separator-lining/separator-lining.component";
import { useExchange, useExchangeRatePoller } from "./exchange-hooks";

const PageContainer = styled.main`
  max-width: 800px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const VerticalFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media screen and (max-width: 700px) {
    marghin-bottom: 30px;
  }
`;

const Error = styled.div`
  color: #a34007;
  font-size: 18px;
  text-align: center;
`;

const Section = styled.section<{ bgColor?: string }>`
  padding: 40px 8px;
  background: ${(props) => props.bgColor || "transparent"};
`;

const insuficientFundsError =
  "You don't have enough funds for the transaction.";

export default function ExchangePage(): ReactElement {
  const sourceCarousel = useRef<CarouselRef>();
  const destCarousel = useRef<CarouselRef>();

  const dispatch = useDispatch();

  const walletList = useWalletList();
  const [destWalletIndex, setDestWalletIndex] = useState(1);
  const [sourceWalletIndex, setSourceWalletIndex] = useState(0);
  const fromCurrency = walletList[sourceWalletIndex].currency;
  const toCurrency = walletList[destWalletIndex].currency;

  useExchangeRatePoller();
  const changeSourceWallet = useCallback(
    (from: number, to: number) => {
      setSourceWalletIndex(to);
      if (to === destWalletIndex) {
        destCarousel.current?.next();
      }
    },
    [destWalletIndex]
  );
  const changeDestWallet = useCallback(
    (from: number, to: number) => {
      setDestWalletIndex(to);
      if (to === sourceWalletIndex) {
        sourceCarousel.current?.next();
      }
    },
    [sourceWalletIndex]
  );

  const exchangeData = useExchange(fromCurrency, toCurrency);

  const sufficientFunds =
    walletList[sourceWalletIndex].amount >= exchangeData.sourceAmount;

  const submitExchange = () => {
    if (!sufficientFunds) return;
    dispatch(
      decreaseBy({
        amount: exchangeData.sourceAmount,
        currency: fromCurrency,
      })
    );
    dispatch(
      increaseBy({
        amount: exchangeData.destinationAmount,
        currency: toCurrency,
      })
    );
  };
  return (
    <PageContainer>
      <VerticalFlex>
        <Section>
          <Carousel
            initialSlide={0}
            ref={sourceCarousel as any}
            beforeChange={changeSourceWallet}
            effect="fade"
          >
            {walletList.map((wallet) => (
              <CurrencyInput
                amount={exchangeData.sourceAmount}
                isDestination={false}
                mainCurrency={wallet.currency}
                onChange={exchangeData.changeSource}
                walletAmount={wallet.amount}
              />
            ))}
          </Carousel>
        </Section>
        <SeparatorLining />
        <Section bgColor="rgba(0,0,0,0.1)">
          <Carousel
            initialSlide={1}
            ref={destCarousel as any}
            beforeChange={changeDestWallet}
            effect="fade"
          >
            {walletList.map((wallet) => (
              <CurrencyInput
                amount={exchangeData.destinationAmount}
                isDestination
                mainCurrency={wallet.currency}
                onChange={exchangeData.changeDestination}
                conversionRate={exchangeData.exchangeRate}
                comparedCurrency={fromCurrency}
                walletAmount={wallet.amount}
                loadingExchangeRate={exchangeData.loading}
              />
            ))}
          </Carousel>
        </Section>
      </VerticalFlex>
      {sufficientFunds || (
        <Error className="mb-4">{insuficientFundsError}</Error>
      )}
      <Center>
        <Button
          loading={exchangeData.loading}
          ghost
          disabled={exchangeData.loading}
          onClick={submitExchange}
        >
          Exchange
        </Button>
      </Center>
    </PageContainer>
  );
}
