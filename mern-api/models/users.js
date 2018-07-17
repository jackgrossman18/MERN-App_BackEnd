const mongoose = require("../db/connection");

const User = new mongoose.Schema({
  email: String,
  password: String
});

mongoose.model("User", User);

module.exports = mongoose;
