const Cart = require("../models/Cart");
const AppError = require("../utils/AppError");

const getUserCart = async (req, res, next) => {
  const cart = await Cart.find({ user: req.user._id });
  res.status(200).send(cart);
};

const createCart = async (req, res, next) => {
  const newCart = new Cart({
    user: req.user._id,
    products: [],
  });
  if (!newCart)
    return next(new AppError(`Please Choose Your Products again`, 500));
  await newCart.save();

  res.status(200).send(newCart);
};

const updateCart = async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new AppError("User not found", 404));
  const { products } = req.body;
  if (!products) return next(new AppError("No Updates Values Found", 404));
  const cart = await Cart.findOne({ user: user._id });
  // cart.products.push(products);
  await Cart.findByIdAndUpdate(cart._id, { products: [...products] });
  res.status(201).send(`Cart ${cart._id} has been updated`);
};

const emptyCart = async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new AppError("User not found", 404));
  const cart_id = user.cart;
  // const cart = await Cart.findById(cart_id);
  await Cart.findByIdAndUpdate(cart_id, { products: [] });
  res.status(200).send(`Cart ${cart_id} Has Been Emptied`);
};

const addToCart = async (req, res, next) => {
  const cart_id = req.params.id;
  const { product } = req.body;
  if (!product) return next(new AppError("No Updates Values Found", 404));
  const cart = await Cart.findById(cart_id);
  cart.products.push(product);
  await Cart.findByIdAndUpdate(cart_id, { products: [...cart.products] });
  res.status(201).send(`Item ${product} added to Cart ${cart_id}`);
};

const removeFromCart = async (req, res, next) => {
  const cart_id = req.params.id;
  const { product } = req.body;
  if (!product) return next(new AppError("No Updates Values Found", 404));
  const cart = await Cart.findById(cart_id);
  const newCart = cart.products.filter((el) => el.toString() !== product);
  await Cart.findByIdAndUpdate(cart_id, { products: [...newCart] });
  res.status(200).send(`Item ${product} removed from Cart ${cart_id}`);
};

const deleteCart = async (req, res, next) => {
  const { user } = req.user;
  const cart_id = user.cart;
  await Cart.findByIdAndDelete(cart_id);
  res.status(200).send(`Cart ${cart_id} has been deleted Successfully`);
};

module.exports = {
  // deleteCart,
  // addToCart,
  // removeFromCart,
  getUserCart,
  createCart,
  updateCart,
  emptyCart,
};
