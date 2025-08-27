const app = require("../server.js");
const { calculateQuote } = require("../server.js");

// Testing the calculateQuote Function
describe("API 3: Convert car value and risk rating to a quote", () => {
  test("Check if entry is null - error for null entry", () => {
    expect(calculateQuote("", 1)).toEqual({
      error: "Entry cannot be empty or 0",
    });
    expect(calculateQuote(8871, "")).toEqual({
      error: "Entry cannot be empty or 0",
    });
    expect(calculateQuote("", "")).toEqual({
      error: "Entry cannot be empty or 0",
    });
    expect(calculateQuote(0, 2)).toEqual({
      error: "Entry cannot be empty or 0",
    });
    expect(calculateQuote(4471, 0)).toEqual({
      error: "Entry cannot be empty or 0",
    });
    expect(calculateQuote(0, 0)).toEqual({
      error: "Entry cannot be empty or 0",
    });
  });

  test("Check if entry is a number - error if not a number", () => {
    expect(calculateQuote("value", 3)).toEqual({
      error: "Please enter a number",
    });
    expect(calculateQuote(4468, "rating")).toEqual({
      error: "Please enter a number",
    });
    expect(calculateQuote("value", "rating")).toEqual({
      error: "Please enter a number",
    });
  });

  test("Check if entry is positive - error if negative", () => {
    expect(calculateQuote(-1684, 5)).toEqual({
      error: "Number cannot be negative",
    });
    expect(calculateQuote(2287, -4)).toEqual({
      error: "Number cannot be negative",
    });
    expect(calculateQuote(-6647, -2)).toEqual({
      error: "Number cannot be negative",
    });
  });

  test("Check if risk rating is from 1 to 5 - error if outside range", () => {
    expect(calculateQuote(4867, 6)).toEqual({
      error: "Risk rating must be from 1 to 5",
    });
    expect(calculateQuote(4867, 0.95)).toEqual({
      error: "Risk rating must be from 1 to 5",
    });
  });

  test("Check if risk rating is whole - error if decimal", () => {
    expect(calculateQuote(8794, 2.25)).toEqual({
      error: "Risk Rating cannot be a decimal number",
    });
  });

  test("Test if calculations are correct", () => {
    expect(calculateQuote(6459, 1)).toEqual({
      yearly_quote: 64.59,
      monthly_quote: 5.38,
    });
    expect(calculateQuote(1586, 2)).toEqual({
      yearly_quote: 31.72,
      monthly_quote: 2.64,
    });
    expect(calculateQuote(4847, 3)).toEqual({
      yearly_quote: 145.41,
      monthly_quote: 12.12,
    });
    expect(calculateQuote(6691, 4)).toEqual({
      yearly_quote: 267.64,
      monthly_quote: 22.3,
    });
    expect(calculateQuote(3571, 5)).toEqual({
      yearly_quote: 178.55,
      monthly_quote: 14.88,
    });
  });
});

// Testing API 3
