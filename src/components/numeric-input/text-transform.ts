export function turnCommaIntoDot(value: string): string {
  return value.replace(",", ".");
}

export function manageZeroPadding(value: string) {
  if (value.length === 0) {
    return "0";
  }

  if (value.length === 1) {
    if (value === ".") {
      return "0";
    }
    return value;
  }
  console.log("value return", value);
  return value.replace(/^0+/, "");
}

export default function preprocess(value: string) {
  const normalizedDots = turnCommaIntoDot(value);
  return manageZeroPadding(normalizedDots);
}
