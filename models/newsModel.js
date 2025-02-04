const mongoose = require("mongoose");
const { Schema } = mongoose;


const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  cover: String,
  gallery: [String],
  isSpecial: { 
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
  
module.exports = mongoose.model("news", newsSchema);