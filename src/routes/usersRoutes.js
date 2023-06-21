const express = require("express");
const app = express();
const router = express.Router();

const verifyToken = require("../utils/verifyToken"); // logged in users, admins, or super admins
const canEditUser = require("../utils/user/canEditUser");
const isAdmin = require("../utils/isAdmin");

const { cloudinaryConfig } = require("../utils/config/cloudinaryConfig");
const { multerUploads } = require("../utils/multer");


const {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  uploadUserPic,
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

app.use("/:id/profile_pic", cloudinaryConfig);
router.patch("/:id/profile_pic", verifyToken, canEditUser, multerUploads, uploadUserPic);

// delete user
router.delete("/:id", verifyToken, isAdmin, deleteUser);

// login
router.post("/login", login);

module.exports = router;
