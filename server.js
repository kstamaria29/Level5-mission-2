"use strict";
const express = require("express");

const app = express();
app.use(express.json());

// Christine's API =================================

const discountCalculation = (Age, Experience) => {
  // Validation
  if (Age == null || Experience == null) {
    return { error: "null input", statusCode: 400 };
  }

  if (typeof Age !== "number" || typeof Experience !== "number" || Age < 0 || Experience < 0) {
    return { error: "invalid input value", statusCode: 400 };
  }

  // Discount Calculation
  let discount = 0;
  if (Age >= 25) discount += 5;
  if (Experience >= 5) discount += 5;
  if (Age >= 40) discount += 5;
  if (Experience >= 10) discount += 5;
  if (discount > 20) discount = 20;

  return { discount, statusCode: 200 };
};

app.post("/api/christine", (req, res) => {
  const { Age, Experience } = req.body;
  const result = discountCalculation(Age, Experience);

  if (result.error) {
    return res.status(result.statusCode).json({ error: result.error });
  }

  return res.status(result.statusCode).json({ discount: result.discount });
});


// Ben's API =======================================

const calculateQuote = (car_value, risk_rating) => {
  // Notifying of error for incorrect entries

  // Checks if input is null or 0
  if (!car_value || !risk_rating) {
    return { error: "Entry cannot be empty or 0" };
  }

  // Checks if input is not a number
  if (isNaN(car_value) || isNaN(risk_rating)) {
    return { error: "Please enter a number" };
  }

  // Checks if input is negative
  if (car_value < 0 || risk_rating < 0) {
    return { error: "Number cannot be negative" };
  }

  // Checks if risk rating is from 1 to 5
  if (risk_rating < 1 || risk_rating > 5) {
    return { error: "Risk rating must be from 1 to 5" };
  }
  // Checks if risk rating is a deminal number
  if (!Number.isInteger(risk_rating)) {
    return { error: "Risk rating cannot be a decimal number" };
  }

  // Calculating yearly preimum
  const yearly_premium = (car_value * risk_rating) / 100;

  // Converting yearly premium to monthly premium
  const yearly_quote = Number(yearly_premium.toFixed(2));
  const monthly_quote = Number((yearly_quote / 12).toFixed(2));

  // Storing yearly and monthly premiums to the final quote
  const final_quote = { yearly_quote, monthly_quote };

  return final_quote;
};

// API 3 - Convert car value and risk rating to a quote
app.post("/api/ben", async (req, res) => {
  // Check if body exists
  if (!req.body) {
    return res.status(400).json({ error: "Please input the values in JSON format" });
  }

  const { car_value, risk_rating } = req.body;

  // Check if required inputs exist
  if (car_value === undefined || risk_rating === undefined) {
    return res.status(400).json({ error: "Both car_value and risk_rating must be provided" });
  }

  const result = calculateQuote(car_value, risk_rating);

  if (result.error) {
    res.status(400).json(result); // if there is an invalid input - send error message with status 400
  } else {
    res.status(200).json(result); // if inputs are valid - send monthly and yearly quote
  }
});

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

  return { car_value: sum * 100 + input.year };
}

// Route to access Kenneth's API
app.post("/api/kenneth", (req, res) => {
  const result = getCarValue(req.body);
  res.json(result);
});

// Start server only if run directly (not during tests)
if (require.main === module) {
  app.listen(3000, () => {
    console.log("API running on port 3000");
  });
}


module.exports = { app, calculateQuote, getCarValue, discountCalculation };


