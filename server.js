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
// Kenneth's API ===================================

app.listen(3000, () => {
  console.log("API running on port 3000");
});

module.exports = app;
