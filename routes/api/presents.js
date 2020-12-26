const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Present = require("../../models/Present");

// @route   GET api/
// @desc
// @access  public
router.post("/create", (req, res) => {
  const { status, userId, majorId } = req.body;

  Present.findOne({
    userId: mongoose.Types.ObjectId(userId),
    majorId: mongoose.Types.ObjectId(majorId),
  }).then((present) => {
    if (present) {
      present.status.push(status);

      Present.updateOne(
        {
          userId: mongoose.Types.ObjectId(userId),
          majorId: mongoose.Types.ObjectId(majorId),
        },
        { $set: { status: present.status } }
      ).then(() => {
        Present.findOne({
          userId: mongoose.Types.ObjectId(userId),
          majorId: mongoose.Types.ObjectId(majorId),
        }).then((present) => {
          return res.json(present);
        });
      });
    } else {
      const present = new Present({
        status,
        userId,
        majorId,
      });
      present.save().then((present) => {
        return res.json(present);
      });
    }
  });
});

// @route   GET api/
// @desc
// @access  public
router.get("/view/:userId/:majorId", (req, res) => {
  const { userId, majorId } = req.params;

  Present.findOne({
    userId: mongoose.Types.ObjectId(userId),
    majorId: mongoose.Types.ObjectId(majorId),
  })
    .then((present) => {
      return res.json(present);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
