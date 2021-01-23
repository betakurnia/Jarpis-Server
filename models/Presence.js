const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PresenceSchema = new Schema({
  majorId: {
    type: Schema.Types.ObjectId,
    ref: "majors",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("presents", PresenceSchema);
