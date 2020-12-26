const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ClasssSchema = new Schema({
  kelas: {
    type: String,
    required: true,
  },
});

module.exports = Kelas = mongoose.model("kelas", ClasssSchema);
