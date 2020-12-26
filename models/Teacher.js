const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeacherSchema = new Schema({
  kelas: {
    type: String,
    ref: "kelas",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  majorId: {
    type: Array,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("teachers", TeacherSchema);
