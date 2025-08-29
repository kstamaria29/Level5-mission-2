const request = require("supertest");
const { app, getCarValue } = require("../server");

describe("Car Value API", () => {
  const cases = [
    // Normal Cases
    {
      name: "Accord 2020 should return 6420",
      input: { model: "Accord", year: 2020 },
      expected: { car_value: 6420 },
    },
    {
      name: "Model S 2022 should handle spaces and return 8822",
      input: { model: "Model S", year: 2022 },
      expected: { car_value: 8822 },
    },

    // Edge Cases
    {
      name: "Single letter model Z 2000 should return 4600",
      input: { model: "Z", year: 2000 },
      expected: { car_value: 4600 },
    },
    {
      name: "Model 'aaaa' with year 0 should return 400",
      input: { model: "aaaa", year: 0 },
      expected: { car_value: 400 },
    },

    // Error Cases
    {
      name: "Non-numeric year should return error",
      input: { model: "Civic", year: "two thousand" },
      expected: { error: "there is an error" },
    },
    {
      name: "Negative year should return error",
      input: { model: "Civic", year: -2022 },
      expected: { error: "there is an error" },
    },
  ];

  cases.forEach(({ name, input, expected }) => {
    test(name, async () => {
      // Function test
      expect(getCarValue(input)).toEqual(expected);

      // Endpoint test
      const res = await request(app).post("/api/kenneth").send(input);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expected);
    });
  });
});
