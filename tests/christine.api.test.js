const app = require("../server");
const { discountCalculation } = require("../server.js");
console.log("discountCalculation is defined:", typeof discountCalculation);

// for loop test cases
const discountTestCases = [
  // Normal Case - young age & low experience
  {
    age: 19,
    experience: 1,
    expected: { discount: 0, statusCode: 200 },
  },
  // Edge Case - extreme age & experience
  {
    age: 120,
    experience: 65,
    expected: { discount: 20, statusCode: 200 },
  },
  // Boundary Case - boundary age & experience
  {
    age: 25,
    experience: 5,
    expected: { discount: 10, statusCode: 200 },
  },

  // Error Case - Null input
  {
    age: null,
    experience: 5,
    expected: { error: "null input", statusCode: 400 },
  },
  // Error Case - Non-numeric input
  {
    age: "eighty five",
    experience: "twenty",
    expected: { error: "invalid input value", statusCode: 400 },
  },
];

discountTestCases.forEach(({ age, experience, expected }) => {
  test(`discountCalculation(${age}, ${experience}) should return ${JSON.stringify(
    expected
  )}`, () => {
    const result = discountCalculation(age, experience);
    expect(result).toEqual(expected);
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
