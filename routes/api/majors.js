const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Majors = require("../../models/Majors");

// @route   GET api/
// @desc
// @access  public
router.get("/view", (req, res) => {
  // const { kelasId } = req.query;

  Majors.find({}).then((majors) => {
    return res.json(majors);
  });
});

// @route   POST api/
// @desc
// @access  public
router.post("/create", (req, res) => {
  const {
    idUser,
    idTeacher,
    majorName,
    hoursOfSubject,
    hoursOfSubjectFinish,
  } = req.body;

  const majors = new Majors({
    // idUser,
    // idTeacher,
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

  Majors.findById(id).then((major) => {
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
