import React, {
  ReactElement,
  useCallback,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import styled from "styled-components";
import preprocess, { toStringWithMostlyTwoDecimals } from "./text-transform";
import {
  hasInvalidCharacters,
  hasMultipleDots,
  hasTooManyDecimals,
} from "./validators";

const textSize = "40px";

const Input = styled.input`
  outline: none;
  background-color: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  color: var(--white);
  font-size: ${textSize};
  max-width: 250px;
  -moz-appearance: textfield !important;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
`;

const Sign = styled.span`
  font-size: ${textSize};
  margin-right: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  sign: "-" | "+";
  onChange: (value: number) => void;
  value: number;
}

export default function NumericInput({
  sign,
  onChange,
  value,
  ...rest
}: Props): ReactElement {
  const [stringState, setStringState] = useState(
    toStringWithMostlyTwoDecimals(value || 0)
  );

  useEffect(() => {
    if (Number(stringState) !== value)
      setStringState(toStringWithMostlyTwoDecimals(value || 0));
  }, [value]);
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: elementValue } = event.target;
      if (
        hasMultipleDots(elementValue) ||
        hasInvalidCharacters(elementValue) ||
        hasTooManyDecimals(elementValue)
      ) {
        return;
      }

      const preprocessedString = preprocess(elementValue);
      setStringState(preprocessedString);
      if (!preprocessedString.endsWith(".")) {
        onChange(Number(preprocessedString));
      }
    },
    [onChange]
  );

  return (
    <Wrapper>
      <Sign>{sign}</Sign>
      <Input
        type="number"
        onChange={handleChange}
        value={stringState}
        {...rest}
      />
    </Wrapper>
  );
}
