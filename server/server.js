const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 8080;

// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(passport.initialize());
// require('./config/passport')(passport);

// ROUTES
const users = require("./api/users");
app.use("/api/users/", users);

const tasks = require("./api/tasks");
app.use("/api/tasks/", tasks);

app.listen(port, () => {
  console.log(`Server runninng on port ${port}`);
});
