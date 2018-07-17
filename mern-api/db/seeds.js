const mongoose = require("./models");
const SquadPlayers = mongoose.model("SquadPlayers");
const playerData = require("./player-data.json");

SquadPlayers.remove({})
  .then(() => {
    SquadPlayers.collection.insert(playerData).then(players => {
      console.log(players);
      process.exit();
    });
  })
  .catch(err => {
    console.log(err);
  });
