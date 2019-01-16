const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Task = require("../models/Task");
const keys = require("../config/keys");

// GET ALL TASKS
router.get("/", (req, res) => {
  Task.find((err, tasks) => {
    res.json(tasks);
  });
});

// GET TASKS FOR A SPECIFIC USER
router.get("/:user", (req, res) => {
  console.log(req.params.user);
  Task.find({ user: req.params.user }, (err, tasks) => {
    res.json(tasks);
  });
});

// ADD A TASK
router.post("/add", (req, res) => {
  const newTask = new Task({
    user: req.body.id,
    name: req.body.name,
    isDone: false
  });

  newTask.save(err => {
    console.log(err);
    res.status(200).send({ status: "OK" });
  });
});

// UPDATE A TASK
router.put("/:id", (req, res) => {
  Task.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, task) => {
    res.status(200).send(task);
  });
});

// DELETE A TASK
router.delete("/:id", (req, res) => {
  Task.findByIdAndDelete({_id: req.params.id})
    .then(task => res.status(200).send(task));
})

module.exports = router;
