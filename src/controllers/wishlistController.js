const express = require("express");
const Wishlist = require("../models/Wishlist");
const AppError = require("../utils/AppError");
const verifyToken = require("../utils/verifyToken");
// ـــــــــــــــــــــــــــــــــــــ Check Id user and Admin ــــــــــــــــــــــــــــــ
const checkId = async (req, res, next) => {
  const wishlist = await Wishlist.findById(req.params.id);
  if (!wishlist)
    return next(
      new AppErrorError(
        `No purchase History with This Id ${req.params.id}`,
        404
      )
    );
  if (
    req.user.role === "admin" ||
    req.user._id.toString() == wishlist.user.toString()
  ) {
    req.wishlist = wishlist;
    next();
  } else {
    return next(
      new AppError("You Aren't Authorized To access this purchase History", 401)
    );
  }
};

// ــــــــــــــــــــــــــــــــــــــــ Get User Wishlist ____________________________________
const getUserWishlist = async (req, res) => {
  const wishlist = await Wishlist.find({ user: req.user._id });
  res.status(200).send(wishlist);
};

//ـــــــــــــــــــــــــــــــــــــــ Get Wishlist By Id ــــــــــــــــــــــــــــــــ
const getOnewishlist = async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  res.status(200).send(wishlist);
};

// ـــــــــــــــــــــــــــــــــــ Update the Wishilst ــــــــــــــــــــــــــــــــــ
const updateWishlist = async (req, res, next) => {
  const { products } = req.body;
  if (!products) return next(new AppError("No Updates Values Found", 404));
  const wishlist = await Wishlist.findOne({ user: req.user._id });
  await Wishlist.findByIdAndUpdate(wishlist._id, {
    products,
  });
  res.status(201).send(`Wishlist With Id ${wishlist._id} Has Been updated`);
};

//ـــــــــــــــــــــــــــــــ Empty The Wishlist ـــــــــــــــــــــــــــــــــــــــ
const emptyWishlist = async (req, res) => {
  await Wishlist.findByIdAndUpdate(req.wishlist._id, { products: [] });
  res
    .status(200)
    .send(`Wishlist with Id=${req.wishlist._id} has been deleted Successfully`);
};

// ــــــــــــــــــــــــــــــ Create Wishlist ـــــــــــــــــــــــــــــــــــــــــــــ
const createWishlist = async (req, res, next) => {
  const { products } = req.body;
  if (!products)
    return next(new AppError("Please choose the products again", 404));
  const newWishlist = new Wishlist({
    user: req.user._id,
    products: products,
  });
  if (!newWishlist)
    return next(new AppError(`Please Choose Your Products again`, 500));
  await newWishlist.save();

  res
    .status(201)
    .json({ message: "Wishlist has been Created", data: newWishlist });
};

// ـــــــــــــــــــــــــــــــــ Remove Wishlist Item ــــــــــــــــــــــــــــــــــــــ
const removeWishlistItem = async (req, res, next) => {
  const { wishlist } = req;
  const { product } = req.body;
  if (!product) return next(new AppError("No Updates Values Found", 404));
  const newWishlist = wishlist.products.filter(
    (prod) => prod.toString() !== product
  );
  await Wishlist.findByIdAndUpdate(wishlist._id, {
    products: newWishlist,
  });
  res.status(200).send(`Cart With Id ${wishlist._id} Has Been updated`);
};

module.exports = {
  emptyWishlist,
  updateWishlist,
  getOnewishlist,
  getUserWishlist,
  createWishlist,
  checkId,
  removeWishlistItem,
};
