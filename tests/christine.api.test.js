const request = require("supertest");
const app = require("../server");

// Which API being tested
describe("POST/api/christine", () => {
  describe("Normal Case", () => {
    // normal age
    it("should return 0% for age <25 and experience <5", async () => {
      const res = await request(app)
        .post("/api/christine")
        .send({ Age: 19, Experience: 1 });
      expect(res.statusCode).toBe(200);
      expect(res.body.discount).toBe(0);
    });

    it("should return 5% for age ≥25 and experience ≥5", async () => {
      const res = await request(app).post("/api/christine").send({
        Age: 28,
        Experience: 9,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.discount).toBe(10);
    });
  });

  describe("Edge Case", () => {
    // extreme age
    it("should return 0% for age <25 and experience <5", async () => {
      const res = await request(app).post("/api/christine").send({
        Age: 1,
        Experience: 0,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.discount).toBe(0);
    });
    it("should return 5% for age ≥25 and experience <5", async () => {
      const res = await request(app).post("/api/christine").send({
        Age: 25,
        Experience: 2,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.discount).toBe(5);
    });
  });

  describe("Boundary Case", () => {
    it("should return 20% for age ≥40 and experience ≥10", async () => {
      const res = await request(app).post("/api/christine").send({
        Age: 40,
        Experience: 10,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.discount).toBe(20);
    });
    it("should return 10% for age ≥25 and experience ≥5", async () => {
      const res = await request(app).post("/api/christine").send({
        Age: 25,
        Experience: 5,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.discount).toBe(10);
    });
  });

  describe("Error Case", () => {
    it("should return error as null is not a valid input", async () => {
      const res = await request(app).post("/api/christine").send({
        Age: 56,
        Experience: null,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/invalid/);
    });

    it("should return error for invalid input value ", async () => {
      const res = await request(app).post("/api/christine").send({
        Age: "thirty five",
        Experience: 5,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/invalid/);
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
// Invalid input values (negative number, non-numeric) - return status code 400
