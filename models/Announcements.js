const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnnouncementSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("announcements", AnnouncementSchema);
