const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Kelas = require("../../models/Kelas");

// @route   GET api/
// @desc
// @access  public
router.get("/view", (req, res) => {
  Kelas.find({}).then((kelas) => {
    return res.json(kelas);
  });
});

module.exports = router;
