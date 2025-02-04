const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username бичнэ үү"],
  },
  phone: {
    type: String,
    unique: [true, "Утасны бүртгэлтэй байна"],
  },
  email: {
    type: String,
    required: [true, "Email хаяг бичнэ үү"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Нууц үг бичнэ үү"],
    minlength: [6, "Нууц үгийн урт хамгийн багад 6 тэмдэгт байна"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "operator", "user"],
    default: "admin",
  },
  booked: [],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.checkPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};
userSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this._update.password = await bcrypt.hash(this._update.password, salt);
  next();
});
userSchema.methods.getJsonWebToken = function () {
  let token = jwt.sign(
    { Id: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIREDIN,
    }
  );
  return token;
};
module.exports = mongoose.model("User", userSchema);