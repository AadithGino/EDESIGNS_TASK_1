const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Number: Number,
  otpStatus: Boolean,
});

const model = mongoose.model("Number", userSchema);

module.exports = model;
