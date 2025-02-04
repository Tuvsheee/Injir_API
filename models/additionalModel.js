// Import mongoose
const mongoose = require("mongoose");

const additionalSchema = new mongoose.Schema({
  logo: String,
  cover: String,
  loginCover:String,
  company: String,
  address: String,
  description1: String,
  description2: String,
  email: String,
  phone: String,
  product: String,
  team: String,
  partner: String,
  user: String,
  googleMap: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Assistant = mongoose.model("Additional", additionalSchema);

module.exports = Assistant;
