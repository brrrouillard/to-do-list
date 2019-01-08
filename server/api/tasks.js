const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Task = require("../models/Task");
const keys = require("../config/keys");

// GET ALL TASKS
router.get("/", (req, res) => {
  Task.find((err, tasks) => {
    res.send(tasks);
  });
});

// GET TASKS FOR A SPECIFIC USER
router.get("/:user", (req, res) => {
  Task.find({ user: req.params.user }, (err, tasks) => {
    res.send(tasks);
  });
});

// ADD A TASK
router.post("/add", (req, res) => {
  const newTask = new Task({
    user: req.body.id,
    name: req.body.name,
    importance: req.body.importance
  });

  newTask.save(err => {
    console.log(err);
    res.status(400).send({ status: "OK" });
  });
});

module.exports = router;
