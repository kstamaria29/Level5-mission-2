const request = require("supertest");
const { app } = require("../server.js");

// for loop test cases
const discountTestCases = [
  // Normal Case - young age & low experience
  {
    testCase: "Normal Case - young age & low experience",
    input: { age: 19, experience: 1 },
    expectedOutput: { discount: 0, statusCode: 200 },
  },
  // Edge Case - extreme age & experience
  {
    testCase: "Edge Case - extreme age & experience",
    input: { age: 120, experience: 65 },
    expectedOutput: { discount: 20, statusCode: 200 },
  },
  // Boundary Case - boundary age & experience
  {
    testCase: "Boundary Case - boundary age & experience",
    input: { age: 25, experience: 5 },
    expectedOutput: { discount: 10, statusCode: 200 },
  },

  // Error Case - Null input
  {
    testCase: "Error Case - Null input",
    input: { age: null, experience: 5 },
    expectedOutput: { error: "null input", statusCode: 400 },
  },
  // Error Case - Non-numeric input
  {
    testCase: "Error Case - Non-numeric input",
    input: { age: "thirty", experience: 5 },
    expectedOutput: { error: "invalid input value", statusCode: 400 },
  },
];

discountTestCases.forEach(({ testCase, input, expectedOutput }) => {
  test(`Test Case: ${testCase}`, async () => {
    const response = await request(app)
      .post("/api/christine")
      .send({ Age: input.age, Experience: input.experience }) // JSON body
      .set("Content-Type", "application/json");

    expect(response.status).toBe(expectedOutput.statusCode);

    expect(response.body).toEqual(expectedOutput.error ? { error: expectedOutput.error } : { discount: expectedOutput.discount });
  });
});

// test(`discountCalculation(${JSON.stringify(age)}, ${JSON.stringify(
//   experience
// )}) should return ${JSON.stringify(expected)}`, () => {
//   const result = discountCalculation(age, experience);
//   expect(result).toEqual(expected);
// });

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
