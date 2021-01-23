const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Majors = require("../../models/Majors");

// @route   GET api/view
// @desc view
// @access  private
router.get("/view", (req, res) => {
  const { kelasId } = req.query;

  if (Boolean(kelasId)) {
    console.log("");
    Majors.find({ classId: kelasId })
      .sort({ date: "1" })
      .then((majors) => {
        return res.json(majors);
      });
  } else {
    Majors.find({})
      .sort({ date: "1" })
      .then((majors) => {
        return res.json(majors);
      });
  }
});

// @route   POST api/vtrsyr
// @desc
// @access  private
router.post("/create", (req, res) => {
  const { majorName, hoursOfSubject, hoursOfSubjectFinish } = req.body;

  const majors = new Majors({
    majorName,
    hoursOfSubject,
    hoursOfSubjectFinish,
  });

  majors.save().then((majors) => {
    return res.json(majors);
  });
});

// @route   GET api/
// @desc
// @access  public
router.get("/view/:id", (req, res) => {
  const { id } = req.params;

  Majors.findById(id)
    .populate("classId")
    .exec((err, major) => {
      if (err) {
        return res.json(err);
      }

      return res.json(major);
    });
});

// @route   GET api/
// @desc
// @access  public
router.post("/viewByArray", (req, res) => {
  const id = req.body;

  var majors = [];

  Majors.findOne({ _id: mongoose.Types.ObjectId(id[0]) }).then((major) => {
    majors.push(major);
    if (id.length === 1) {
      return res.json(majors);
    }
    Majors.findOne({ _id: mongoose.Types.ObjectId(id[1]) }).then((major) => {
      majors.push(major);
      if (id.length === 2) {
        return res.json(majors);
      }
      Majors.findOne({ _id: mongoose.Types.ObjectId(id[2]) }).then((major) => {
        majors.push(major);
        if (id.length === 3) {
          return res.json(majors);
        }
      });
    });
  });
});

module.exports = router;
