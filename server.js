"use strict";
const express = require("express");

const app = express();
app.use(express.json());

// Christine's API =================================
app.post("/api/christine", (req, res) => {
  const { Age, Experience } = req.body;

  // Validation
  if (
    typeof Age !== "number" ||
    typeof Experience !== "number" ||
    Age < 0 ||
    Experience < 0
  ) {
    return res.status(400).json({ message: "invalid input value" });
  }

  // Discount Calculation
  let discount = 0;
  if (Age >= 25) discount += 5;
  if (Experience >= 5) discount += 5;
  if (Age >= 40) discount += 5;
  if (Experience >= 10) discount += 5;
  if (discount > 20) discount = 20;

  res.status(200).json({ discount });
});

// Ben's API =======================================

// Kenneth's API ===================================
function getCarValue(input) {
  if (
    !input ||
    typeof input.model !== "string" ||
    typeof input.year !== "number" ||
    input.model.trim() === "" ||
    !Number.isInteger(input.year) ||
    input.year < 0
  ) {
    return { error: "there is an error" };
  }

  // Remove non-alphabet characters and make uppercase
  const letters = input.model.toUpperCase().replace(/[^A-Z]/g, "");

  if (letters.length === 0) {
    return { error: "there is an error" };
  }

  // Calculate alphabet sum
  let sum = 0;
  for (let char of letters) {
    sum += char.charCodeAt(0) - 64; // A=65 ASCII = 1, B=66 ASCII = 2, etc..
  }

  const carValue = sum * 100 + input.year;

  return { car_value: carValue };
}

module.exports = { getCarValue };

// Start server only if run directly (not during tests)
if (require.main === module) {
  app.listen(3000, () => {
    console.log("API running on port 3000");
  });
}

module.exports = app;
