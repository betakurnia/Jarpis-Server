const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MajorSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  idTeacher: {
    type: Schema.Types.ObjectId,
    ref: "teachers",
  },
  majorName: {
    type: String,
    required: true,
  },
  hoursOfSubject: {
    type: Date,
    required: true,
  },
  hoursOfSubjectFinish: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("majors", MajorSchema);
