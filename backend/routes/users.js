const express = require("express");
const router = express.Router();
const {
  createUser,
  // getUsers,
  getUserbyUsername,
} = require("../controllers/usersController");

// route create user
router.post("/users/create", createUser);

//route Get all users
// router.get("/users", getUsers);

//route Get by username
router.get("/users/:username", getUserbyUsername);

module.exports = router;
