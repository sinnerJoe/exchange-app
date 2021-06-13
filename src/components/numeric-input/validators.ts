export function hasInvalidCharacters(value: string) {
  return !!value.match(/[^0-9,.]/);
}

export function hasTooManyDecimals(value: string) {
  const [, decimal] = value.split(".");
  return !!decimal && decimal.length > 2;
}

export function hasMultipleDots(value: string) {
  const val = (value.match(/\.|,/g) || []).length > 1;
  return val;
}
