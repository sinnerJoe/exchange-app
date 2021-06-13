import React, {
  ReactElement,
  useCallback,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import styled from "styled-components";
import preprocess from "./text-transform";
import { hasInvalidCharacters, hasMultipleDots } from "./validators";

const Input = styled.input`
  background-color: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
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
  const [stringState, setStringState] = useState(String(value || 0));

  useEffect(() => {
    setStringState(String(value));
  }, [value]);
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: elementValue } = event.target;
      if (hasMultipleDots(elementValue) || hasInvalidCharacters(elementValue)) {
        return;
      }

      const preprocessedString = preprocess(elementValue);
      console.log(elementValue);
      setStringState(preprocessedString);
      if (!preprocessedString.endsWith(".")) {
        onChange(Number(preprocessedString));
      }
    },
    [onChange]
  );

  return (
    <Wrapper>
      <span>{sign}</span>
      <Input onChange={handleChange} value={stringState} {...rest} />
    </Wrapper>
  );
}
