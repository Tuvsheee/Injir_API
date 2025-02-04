const mongoose = require("mongoose");

const TechSchema = new mongoose.Schema({
  name: String,
  file: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tech", TechSchema);
