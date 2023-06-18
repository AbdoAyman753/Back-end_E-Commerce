const express = require("express");
const router = express.Router();

const verifyToken = require("../utils/verifyToken"); // logged in users, admins, or super admins
const verifyAdminRole = require("../utils/verifyAdminRole"); // admins & super admins
const canUpdateRole = require("../utils/verifySuper"); // only super admins
const canUpdateProfile = require("../utils/canUpdateProfile"); // only you or a super-admin can update your profile info

const {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/authenticationController");

// getting all users
router.get("/", verifyToken, getAllUsers);

// getting user by id
router.get("/:id", verifyToken, getUserById);

// create a new user (register)
router.post("/", register);

// update user
router.patch("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// login
router.post("/login", login);

module.exports = router;
