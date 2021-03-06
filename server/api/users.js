const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const keys = require("../config/keys");

// GET ALL USERS
router.get("/", (req, res) => {
  User.find((err, users) => {
    res.json(users);
  });
});

// REGISTER NEW USER
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user));
        });
      });
    }
  });
});

// LOGIN A USER
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find the user
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) return res.status(404).json({ email: "User not found" });

    // Check for password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
            console.log("Token generated");
          }
        );
      } else return res.status(400).json({ password: "Password incorrect" });
    });
  });
});

module.exports = router;
