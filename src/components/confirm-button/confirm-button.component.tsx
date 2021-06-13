import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: 1px solid var(--white);
  padding: 4px 10px;
  :hover {
    background: var(--bg-blue);
  }
`;

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export default function ConfirmButton(props: Props) {
  return <Button {...props} />;
}
