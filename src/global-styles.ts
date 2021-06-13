import { createGlobalStyle } from "styled-components";

function generateSpacings() {
  for (let size = 4; size <= 40; size += 4) {
    // eslint-disable-next-line no-unused-expressions
  }
  return new Array(10).map((v, index) => {
    const size = (index + 1) * 4;
    return createGlobalStyle`
    .mt-${size} {
      margin-top: ${size};
    }
    .mb-${size} {
      margin-bottom: ${size};
    }
    .ml-${size} {
      margin-left: ${size};
    }
    .mr-${size} {
      margin-right: ${size};
    }
  `;
  });
}

export default generateSpacings();
