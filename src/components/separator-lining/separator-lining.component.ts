import styled from "styled-components";

export default styled.div`
  position: relative;
  height: 0px;
  ::after {
    z-index: 1;
    position: absolute;
    left: 50%;
    width: 0;
    height: 0;
    border-top: 25px solid var(--bg-blue);
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    bottom: -24px;
    transform: translateX(-25px);
    content: "";
  }
`;
