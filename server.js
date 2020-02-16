const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/Register");
const signin = require("./controllers/Signin");
const profile = require("./controllers/Profile");
const image = require("./controllers/Image");

const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "vcdeviasaber",
    database: "facerecognition"
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(db.users);
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});
