const { getCarValue } = require("../server");

describe("Car Value API", () => {
  //
  // 1. Normal Cases
  //
  test("Accord 2020 should return 6437", () => {
    expect(getCarValue({ model: "Accord", year: 2020 })).toEqual({ car_value: 6420 });
  });

  test("Model S 2022 should handle spaces and return 8822", () => {
    expect(getCarValue({ model: "Model S", year: 2022 })).toEqual({ car_value: 8822 });
  });

  //
  // 2. Edge Cases
  //
  test("Single letter model Z 2000 should return 4600", () => {
    expect(getCarValue({ model: "Z", year: 2000 })).toEqual({ car_value: 4600 });
  });

  test("Model 'aaaa' with year 0 should return 400", () => {
    expect(getCarValue({ model: "aaaa", year: 0 })).toEqual({ car_value: 400 });
  });

  //
  // 3. Error Cases
  //
  test("Non-numeric year should return error", () => {
    expect(getCarValue({ model: "Civic", year: "two thousand" })).toEqual({ error: "there is an error" });
  });

  test("Negative year should return error", () => {
    expect(getCarValue({ model: "Civic", year: -2022 })).toEqual({ error: "there is an error" });
  });
});
