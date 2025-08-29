const { app } = require("../server.js");
const request = require("supertest");
const { calculateQuote } = require("../server.js");

// Testing the calculateQuote Function
describe("Testing function to convert car value and risk rating to a quote", () => {
  test("Check if entry is null - error for null entry", () => {
    const cases = [
      ["", 1],
      [8871, ""],
      ["", ""],
      [0, 2],
      [4471, 0],
      [0, 0],
    ];

    for (const [car_value, risk_rating] of cases) {
      expect(calculateQuote(car_value, risk_rating)).toEqual({
        error: "Entry cannot be empty or 0",
      });
    }
  });

  test("Check if entry is a number - error if not a number", () => {
    const cases = [
      ["value", 3],
      [4468, "rating"],
      ["value", "rating"],
    ];

    for (const [car_value, risk_rating] of cases) {
      expect(calculateQuote(car_value, risk_rating)).toEqual({
        error: "Please enter a number",
      });
    }
  });

  test("Check if entry is positive - error if negative", () => {
    const cases = [
      [-1684, 5],
      [2287, -4],
      [-6647, -2],
    ];

    for (const [car_value, risk_rating] of cases) {
      expect(calculateQuote(car_value, risk_rating)).toEqual({
        error: "Number cannot be negative",
      });
    }
  });

  test("Check if risk rating is from 1 to 5 - error if outside range", () => {
    const cases = [
      [4867, 6],
      [4867, 0.95],
    ];

    for (const [car_value, risk_rating] of cases) {
      expect(calculateQuote(car_value, risk_rating)).toEqual({
        error: "Risk rating must be from 1 to 5",
      });
    }
  });

  test("Check if risk rating is whole - error if decimal", () => {
    const cases = [[8794, 2.25]];

    for (const [car_value, risk_rating] of cases) {
      expect(calculateQuote(car_value, risk_rating)).toEqual({
        error: "Risk rating cannot be a decimal number",
      });
    }
  });

  test("Test if calculations are correct", () => {
    const cases = [
      [6459, 1],
      [1586, 2],
      [4847, 3],
      [6691, 4],
      [3571, 5],
    ];

    const outcomes = [
      { yearly_quote: 64.59, monthly_quote: 5.38 },
      { yearly_quote: 31.72, monthly_quote: 2.64 },
      { yearly_quote: 145.41, monthly_quote: 12.12 },
      { yearly_quote: 267.64, monthly_quote: 22.3 },
      { yearly_quote: 178.55, monthly_quote: 14.88 },
    ];

    for (let i = 0; i < cases.length; i++) {
      const [car_value, risk_rating] = cases[i];
      expect(calculateQuote(car_value, risk_rating)).toEqual(outcomes[i]);
    }
  });
});

// Testing posting JSON to API 3
describe("Testing the POST function for API 3", () => {
  // Testing for null or 0 entries
  test("Check if entry is null - error for null entry", async () => {
    const cases = [
      { car_value: "", risk_rating: 1 },
      { car_value: 8871, risk_rating: "" },
      { car_value: "", risk_rating: "" },
      { car_value: 0, risk_rating: 2 },
      { car_value: 4471, risk_rating: 0 },
      { car_value: 0, risk_rating: 0 },
    ];

    for (const body of cases) {
      const response = await request(app).post("/api/ben").send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Entry cannot be empty or 0" });
    }
  });

  // Testing for non-number entries
  test("Check if entry is a number - error if not a number", async () => {
    const cases = [
      { car_value: "value", risk_rating: 3 },
      { car_value: 4468, risk_rating: "rating" },
      { car_value: "value", risk_rating: "rating" },
    ];

    for (const body of cases) {
      const response = await request(app).post("/api/ben").send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Please enter a number" });
    }
  });

  // Testing for negative entries
  test("Check if entry is positive - error if negative", async () => {
    const cases = [
      { car_value: -1684, risk_rating: 5 },
      { car_value: 2287, risk_rating: -4 },
      { car_value: -6647, risk_rating: -2 },
    ];

    for (const body of cases) {
      const response = await request(app).post("/api/ben").send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Number cannot be negative" });
    }
  });

  // Testing for risk ratings outside of the 1 to 5 range
  test("Check if risk rating is from 1 to 5 - error if outside range", async () => {
    const cases = [
      { car_value: 4867, risk_rating: 6 },
      { car_value: 4867, risk_rating: 0.95 },
    ];

    for (const body of cases) {
      const response = await request(app).post("/api/ben").send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Risk rating must be from 1 to 5",
      });
    }
  });

  // Testing for risk ratings for decimal entries
  test("Check if risk rating is whole - error if decimal", async () => {
    const cases = [{ car_value: 8794, risk_rating: 2.25 }];

    for (const body of cases) {
      const response = await request(app).post("/api/ben").send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Risk rating cannot be a decimal number",
      });
    }
  });

  // Testing for correct calculations
  test("Test if calculations are correct", async () => {
    const cases = [
      { car_value: 6459, risk_rating: 1 },
      { car_value: 1586, risk_rating: 2 },
      { car_value: 4847, risk_rating: 3 },
      { car_value: 6691, risk_rating: 4 },
      { car_value: 3571, risk_rating: 5 },
    ];
    const outcomes = [
      { yearly_quote: 64.59, monthly_quote: 5.38 },
      { yearly_quote: 31.72, monthly_quote: 2.64 },
      { yearly_quote: 145.41, monthly_quote: 12.12 },
      { yearly_quote: 267.64, monthly_quote: 22.3 },
      { yearly_quote: 178.55, monthly_quote: 14.88 },
    ];

    for (let i = 0; i < cases.length; i++) {
      const response = await request(app).post("/api/ben").send(cases[i]);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(outcomes[i]);
    }
  });
});
