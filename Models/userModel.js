const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  image: {
    type: String,

  },
  is_admin: {
    type: Number,
    required: true,
  },
  is_varified: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
