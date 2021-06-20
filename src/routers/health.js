const express = require("express");
const router = new express.Router();

router.get("/", async (req, res) => {
  console.log("hello");

  res.status(200).send("success");
});
module.exports = router;
