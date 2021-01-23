const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Exams = require("../../models/Exams");
const validateExamData = require("../../validation/exam");
const validateExamsData = require("../../validation/exams");

// @route   GET api/create/user
// @desc create user
// @access  private teacher
router.post("/create/user", (req, res) => {
  const { question, type, majorId, userId, examStudentAnswer } = req.body;

  const { errors, isValid } = validateExamData(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  var result;

  Exams.findOne({
    majorId: mongoose.Types.ObjectId(majorId),
    userId: "guru",
  })
    .then((exams) => {
      var correct = [];

      var totalExam;

      totalExam = exams.question.length;
      exams.question.map((exam, i) => {
        if (exam.answer === examStudentAnswer[i]) {
          correct.push(true);
        }
        result = (100 / totalExam) * correct.length;
      });
    })
    .then(() => {
      const newExam = new Exams({
        userId,
        majorId,
        question,
        type,
        examStudentAnswer,
        result,
      });
      newExam.save().then((exam) => {
        return res.json(exam);
      });
    });
});

// @route   POST api/create
// @desc create answer
// @access  private teacher
router.post("/create", (req, res) => {
  const { question, type, majorId, teacherId, userId } = req.body;

  const { errors, isValid } = validateExamsData(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { types } = req.query;

  Exams.findOne({ majorId: majorId, type: types })
    .then((exams) => {
      if (exams) {
        Exams.updateOne(
          { majorId: majorId, type: types },
          { $set: { question } }
        )
          .then((announcement) => {
            return res.json(announcement);
          })
          .catch((err) => console.log(err));
      } else {
        const newExam = new Exams({
          teacherId,
          majorId,
          question,
          type,
          userId,
        });

        newExam.save().then((exam) => {
          return res.json(exam);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   GET api/view/:id
// @desc view by id
// @access  private teacher
router.get("/view/:id", (req, res) => {
  const { id } = req.params;

  const { type } = req.query;

  Exams.findOne({ majorId: id, type })
    .then((exams) => {
      return res.json(exams);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   GET api/view/recapitulation/:id
// @desc view recapitulation
// @access  public
router.get("/view/recapitulation/:id", (req, res) => {
  const { id } = req.params;

  const { type } = req.query;

  Exams.find({
    userId: {
      $not: /^g.*/,
    },
    majorId: id,
    type,
  })
    .populate("userId", ["name"])
    .populate("majorId", ["majorName"])
    .exec(function (err, exam) {
      if (err) {
        console.log(err);
      }
      res.json(exam);
    });
});

// @route   GET api/view/recapitulation/:id
// @desc view recapitulation by id
// @access  public
router.get("/view/recapitulations/:id", (req, res) => {
  const { id } = req.params;

  Exams.find({
    userId: id,
  })
    .populate("userId", ["name"])
    .populate("majorId", ["majorName"])
    .exec(function (err, exam) {
      if (err) {
        console.log(err);
      }
      res.json(exam);
    });
});

// @route   GET api/view/:id/:userId
// @desc view by id and userId
// @access  public
router.get("/view/:id/:userId", (req, res) => {
  const { id, userId } = req.params;

  const { type } = req.query;

  Exams.findOne({ majorId: id, type, userId })
    .then((exams) => {
      return res.json(exams);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   GET api/view-exam/:id
// @desc view exam by id
// @access  public
router.get("/view-exam/:id", (req, res) => {
  const { id } = req.params;

  Exams.find({ majorId: id, userId: "guru" })
    .then((exams) => {
      return res.json(exams);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route POST api/delete/:id/:type
// @desc delete by id and type
// @access  public
router.post("/delete/:id/:type", (req, res) => {
  const { id, type } = req.params;

  Exams.deleteOne({ majorId: id, type })
    .then(() => {
      Exams.find({ majorId: id, userId: "guru" })
        .then((exam) => {
          return res.json(exam);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
