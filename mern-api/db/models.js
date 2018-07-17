const mongoose = require("./connection.js");

const SquadPlayers = new mongoose.Schema({
  name: String,
  position: String,
  jerseyNumber: Number,
  dateOfBirth: String,
  nationality: String,
  contractUntil: String,
  marketValue: String
});

module.exports = mongoose.model("SquadPlayers", SquadPlayers);
