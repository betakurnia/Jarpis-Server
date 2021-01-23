const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Presence = require("../../models/Presence");

// @route   GET post/create
// @desc  update presence if exist create presence if not exist
// @access  private student
router.post("/create", (req, res) => {
  const { status, userId, majorId } = req.body;

  Presence.findOne({
    userId: mongoose.Types.ObjectId(userId),
    majorId: mongoose.Types.ObjectId(majorId),
  }).then((presence) => {
    if (presence) {
      presence.status.push(status);

      Presence.updateOne(
        {
          userId: mongoose.Types.ObjectId(userId),
          majorId: mongoose.Types.ObjectId(majorId),
        },
        { $set: { status: presence.status } }
      ).then(() => {
        Presence.findOne({
          userId: mongoose.Types.ObjectId(userId),
          majorId: mongoose.Types.ObjectId(majorId),
        }).then((presence) => {
          return res.json(presence);
        });
      });
    } else {
      const presence = new Presence({
        status,
        userId,
        majorId,
      });
      presence.save().then((presence) => {
        return res.json(presence);
      });
    }
  });
});

// @route   GET api/view/:userid/:majorId
// @desc find presence
// @access  public
router.get("/view/:userId/:majorId", (req, res) => {
  const { userId, majorId } = req.params;

  Presence.findOne({
    userId: mongoose.Types.ObjectId(userId),
    majorId: mongoose.Types.ObjectId(majorId),
  })
    .then((presence) => {
      return res.json(presence);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
