export function hasInvalidCharacters(value: string) {
  return !!value.match(/[^0-9,]|\./);
}

export function hasMultipleDots(value: string) {
  const val = (value.match(/\.|,/g) || []).length > 1;
  return val;
}
