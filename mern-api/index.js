const express = require("express");
const parser = require("body-parser");
const mongoose = require("./db/models");
const SquadPlayers = mongoose.model("SquadPlayers");
const cors = require("cors");
const passport = require("./config/passport")();
const userController = require("./controllers/users");
const jwt = require("jwt-simple");
const passportJWT = require("passport-jwt");
const config = require("./config/config");
// const mongoose = require("./models/users");
const User = mongoose.model("User");
const app = express();

app.set("port", process.env.PORT || 3001);
app.use(cors());
app.use(parser.json());
app.use(passport.initialize());

app.use(express.static("client/build"));
app.use("/users", userController);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index/html");
});

app.get("/players", (req, res, next) => {
  SquadPlayers.find()
    .then(players => {
      res.json(players);
    })
    .catch(err => console.log(err));
});

app.get("/players/:id", (req, res) => {
  SquadPlayers.findById(req.params.id)
    .then(player => {
      res.json(player);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/players", (req, res) => {
  SquadPlayers.create(req.body)
    .then(squadPlayer => res.json(squadPlayer))
    .catch(err => console.log(err));
});

app.post("/SignUpForm", (req, res) => {
  if (req.body.email && req.body.password) {
    let newUser = {
      email: req.body.email,
      password: req.body.password
    };
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        User.create(newUser).then(user => {
          if (user) {
            var payload = {
              id: newUser.id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
              token: token
            });
          } else {
            res.sendStatus(401);
          }
        });
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
