const express = require("express");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();
const {
  // deleteCart,
  // addToCart,
  // removeFromCart,
  getUserCart,
  createCart,
  updateCart,
  emptyCart,
} = require("../controllers/cartController");

router.post("/new", verifyToken, createCart);
// router.get("/", verifyToken, )
router.get("/myCart", verifyToken, getUserCart);
router.patch('/updateCart', verifyToken, updateCart);
// router.patch("/addItem", verifyToken, addToCart);
// router.patch("/removeItem", verifyToken, removeFromCart);
router.patch("/emptyCart", verifyToken, emptyCart);

module.exports = router;
