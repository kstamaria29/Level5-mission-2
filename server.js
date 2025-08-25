"use strict";
import express from "express";

const app = express();
app.use(json());

// Christine's API =================================
// Ben's API =======================================
// Kenneth's API ===================================

app.listen(3000, () => {
  console.log("API running on port 3000");
});
