const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  isLink:Boolean,
  link:String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Service", serviceSchema);
