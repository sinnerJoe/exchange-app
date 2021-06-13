import {
  manageZeroPadding,
  turnCommaIntoDot,
  toStringWithMostlyTwoDecimals,
} from "./text-transform";

it("removes zero prefix is integer", () => {
  expect(manageZeroPadding("05")).toEqual("5");
});

it("removes extra zeroes from a float", () => {
  expect(manageZeroPadding("00.5")).toEqual("0.5");
});

it("turns dot into 0.", () => {
  expect(manageZeroPadding(".")).toEqual("0.");
});

it("turns comma into dot", () => {
  expect(turnCommaIntoDot(",")).toEqual(".");
});

it("returns the number if it looks okay", () => {
  expect(turnCommaIntoDot("5.47")).toEqual("5.47");
});

it("returns zero for empty string", () => {
  expect(manageZeroPadding("")).toEqual("0");
});

it("removes extra decimals", () => {
  expect(toStringWithMostlyTwoDecimals(5.0501)).toEqual("5.05");
});

it("converts zero as is", () => {
  expect(toStringWithMostlyTwoDecimals(0)).toEqual("0");
});

it("removes decimals if they equal zero", () => {
  expect(toStringWithMostlyTwoDecimals(5)).toEqual("5");
});
