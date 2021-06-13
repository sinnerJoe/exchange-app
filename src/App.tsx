import ExchangePage from "pages/exchange.page";
import React from "react";
import styled from "styled-components";
import "./App.scss";

const Background = styled.main`
  --bg-blue: #1f70ff;
  background: var(--bg-blue);
  width: 100vw;
  height: 100vh;
  --white: #eafcff;
  --secondary-white: #c1ccdf;
  color: var(--white);
`;

function App() {
  return (
    <Background>
      <ExchangePage />
    </Background>
  );
}

export default App;
