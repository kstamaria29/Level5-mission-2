"use strict";
const express = require("express");

const app = express();
app.use(express.json());

// Christine's API =================================
app.post("/api/christine", (req, res) => {
  // API 4
  res.send("hello christine");
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
  // CHecks if risk rating is a deminal number
  if (!Number.isInteger(risk_rating)) {
    return { error: "Risk Rating cannot be a decimal number" };
  }

  // Calculating yearly preimum
  yearly_premium = (car_value * risk_rating) / 100;

  // Converting yearly premium to monthly premium
  yearly_quote = Number(yearly_premium.toFixed(2));
  monthly_quote = Number((yearly_quote / 12).toFixed(2));

  // Storing yearly and monthly premiums to the final quote
  final_quote = { yearly_quote, monthly_quote };

  return final_quote;
};

app.post("/api/ben", async (req, res) => {
  //API 3
  res.json({});
});

module.exports = { app, calculateQuote };

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

module.exports = { app, getCarValue };

// Start server only if run directly (not during tests)
if (require.main === module) {
  app.listen(3000, () => {
    console.log("API running on port 3000");
  });
}
