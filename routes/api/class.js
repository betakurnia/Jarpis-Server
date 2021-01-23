const express = require("express");
const router = express.Router();

const Kelas = require("../../models/Kelas");

// @route   GET api/view
// @desc class
// @access  public
router.get("/view", (req, res) => {
  Kelas.find({}).then((kelas) => {
    return res.json(kelas);
  });
});

module.exports = router;
