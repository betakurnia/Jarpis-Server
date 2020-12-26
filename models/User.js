const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
  nis: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  religion: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
