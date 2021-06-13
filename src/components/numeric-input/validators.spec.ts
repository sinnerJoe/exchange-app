import {
  hasInvalidCharacters,
  hasTooManyDecimals,
  hasMultipleDots,
} from "./validators";

it("should spot invalid characters", () => {
  expect(hasInvalidCharacters("saf")).toEqual(true);
});
it("should return false for valid numbers", () => {
  expect(hasInvalidCharacters("5.5")).toEqual(false);
});
it("should accept commas", () => {
  expect(hasInvalidCharacters("5,0")).toEqual(false);
});
it("should reject more than decimals", () => {
  expect(hasTooManyDecimals("5.00000")).toEqual(true);
});
it("should accept integers", () => {
  expect(hasTooManyDecimals("5")).toEqual(false);
});
it("should accept floats with 2 or less decimals", () => {
  expect(hasTooManyDecimals("5.06")).toEqual(false);
  expect(hasTooManyDecimals("5.0")).toEqual(false);
});

it("should reject 2 dots", () => {
  expect(hasMultipleDots("5.0.6")).toEqual(true);
});
it("should reject dot and a comma", () => {
  expect(hasMultipleDots("5.0,6")).toEqual(true);
});

it("should accept a single comma", () => {
  expect(hasMultipleDots("5,6")).toEqual(false);
});
