export function turnCommaIntoDot(value: string): string {
  return value.replace(",", ".");
}

export function manageZeroPadding(value: string) {
  if (value.length === 0) {
    return "0";
  }

  if (value.length === 1) {
    if (value === ".") {
      return "0.";
    }
    return value;
  }

  const [integer] = value.split(".");

  if (integer.startsWith("0") && integer.length > 1) {
    return value.replace(/^0/, "");
  }

  return value;
}

export default function preprocess(value: string) {
  const normalizedDots = turnCommaIntoDot(value);
  return manageZeroPadding(normalizedDots);
}

export function toStringWithMostlyTwoDecimals(nr: number) {
  const fixedStr = nr.toFixed(2);

  const res = fixedStr.replace(/\.(00|0)$/, "");

  return res;
}
