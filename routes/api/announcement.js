const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Announcements = require("../../models/Announcements");
const validateAnnouncement = require("../../validation/announcement");

// @route GET api/view
// @desc view announcement
// @access  public
router.get("/view", (req, res) => {
  Announcements.find({})
    .then((announcements) => {
      return res.json(announcements);
    })
    .catch((err) => console.log(err));
});

// @route POST api/create
// @desc create announcement
// @access  private admin
router.post("/create", (req, res) => {
  const { errors, isValid } = validateAnnouncement(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { title, description } = req.body;

  const announcement = new Announcements({
    title,
    description,
  });

  announcement.save().then((announcement) => {
    res.json(announcement);
  });
});

// @route POST api/update/:id
// @desc update announcement
// @access  private admin
router.post("/update/:id", (req, res) => {
  const { title, description } = req.body;

  const { id } = req.params;

  Announcements.updateOne(
    { _id: mongoose.Types.ObjectId(id) },
    { $set: { title, description } }
  )
    .then((announcement) => {
      return res.json(announcement);
    })
    .catch((err) => console.log(err));
});

// @route POST api/delete
// @desc delete announcement
// @access  private admin
router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  Announcements.deleteOne({ _id: mongoose.Types.ObjectId(id) }).then(() => {
    Announcements.find({})
      .then((announcements) => {
        return res.json(announcements);
      })
      .catch((err) => console.log(err));
  });
});

// @route GET api/view/:id
// @desc view by id
// @access  private admin
router.get("/view/:id", (req, res) => {
  const { id } = req.params;
  Announcements.findById(id)
    .then((announcements) => {
      return res.json(announcements);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
