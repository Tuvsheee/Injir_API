const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  little: String,
  big: String,
  fileType: {
    type: String,
    enum: ["image", "video"], 
    default: "image",
  },
  file: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Banner", BannerSchema);
