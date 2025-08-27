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

app.listen(3000, () => {
  console.log("API running on port 3000");
});

module.exports = app;
