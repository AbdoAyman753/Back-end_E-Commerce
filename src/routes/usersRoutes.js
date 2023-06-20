const express = require("express");
const router = express.Router();

const verifyToken = require("../utils/verifyToken"); // logged in users, admins, or super admins
const canEditUser = require("../utils/user/canEditUser");
const isAdmin = require("../utils/isAdmin");


const {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");

// getting all users
router.get("/", verifyToken, getAllUsers);

// getting user by id
router.get("/:id", verifyToken, getUserById);

// create a new user (register)
router.post("/", register);

// update user
router.patch("/:id", verifyToken, canEditUser, updateUser);

// delete user
router.delete("/:id", verifyToken, isAdmin, deleteUser);

// login
router.post("/login", login);

module.exports = router;
