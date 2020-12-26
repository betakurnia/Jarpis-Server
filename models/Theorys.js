const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TheorysSchema = new Schema({
  majorId: {
    type: Schema.Types.ObjectId,
    ref: "majors",
  },
  description: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  numberOfTheory: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("theorys", TheorysSchema);
