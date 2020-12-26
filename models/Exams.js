const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExamSchema = new Schema({
  userId: {
    type: String,
    ref: "users",
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "teachers",
  },
  majorId: {
    type: Schema.Types.ObjectId,
    ref: "majors",
  },
  question: {
    type: Array,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
  score: {
    type: String,
  },
  examStudentAnswer: {
    type: Array,
  },
  result: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Exams = mongoose.model("exams", ExamSchema);
