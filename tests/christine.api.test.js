const app = require("../server");
const { discountCalculation } = require("../server");

// Test cases for discountCalculation function

describe("discountCalculation", () => {
  describe("Normal Case", () => {
    // normal age
    it("should return 0% for age <25 and experience <5", () => {
      expect(discountCalculation(19, 1)).toEqual({ discount: 0 });
      expect(res.statusCode).toBe(200);
    });

    it("should return 15% for age >=40 and experience >=5", () => {
      expect(discountCalculation(44, 5)).toEqual({ discount: 15 });
      expect(res.statusCode).toBe(150);
    });
  });

  describe("Edge Case", () => {
    // extreme age
    it("should return 20% for age >=40 and experience >=10", () => {
      expect(discountCalculation(120, 65)).toEqual({ discount: 20 });
      expect(res.statusCode).toBe(200);
    });
    // extreme experience
    it("should return 5% for age ≥25 and experience <5", () => {
      expect(discountCalculation(25, 2)).toEqual({ discount: 5 });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Boundary Case", () => {
    // boundary age & experience
    it("should return 10% for age >=25 and experience >=5", () => {
      expect(discountCalculation(25, 5)).toEqual({ discount: 10 });
      expect(res.statusCode).toBe(200);
    });

    // boundary experience
    it("should return 5% for age <25 and experience >=5", () => {
      expect(discountCalculation(23, 5)).toEqual({ discount: 5 });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Error Case", () => {
    // error handling
    it("should return status code 400 for null input", () => {
      expect(discountCalculation(null, 5)).toMatch(/invalid/);
      expect(res.statusCode).toBe(400);
    });

    it("should return status code 400 for invalid input values", () => {
      expect(discountCalculation("eighty five", "twenty")).toMatch(/invalid/);
      expect(res.statusCode).toBe(400);
    });
  });
});

// API requirement:
//This API takes 2 parameters as input in JSON format that includes:
// The "age" (e.g. 30) and "experience" (e.g 5 YOE).
// The output is a JSON format with the suggested discount rate for the insurance policy.

// Requirement:
// Drivers aged ≥25yo get 5% disc
// Driver with experience ≥5 get extra 5% disc
// Driver aged ≥40yo get extra 5% disc
// Driver with experience ≥10 get extra 5% disc
// Max disc = 20%
// Invalid input values (negative number, non-numeric) - return status code 400//}
