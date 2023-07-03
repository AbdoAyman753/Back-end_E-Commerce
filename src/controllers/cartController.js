const Cart = require("../models/Cart");
const AppError = require("../utils/AppError");

const getUserCart = async (req, res, next) => {
	const cart = await Cart.find({ user: req.user._id });
	res.status(200).send(cart);
};


const addToCart = async (req, res, next) => {
    const cart_id = req.params.id;
	const { product } = req.body;
	if (!product) return next(new AppError("No Updates Values Found", 404));
	const cart = await Cart.findById(cart_id);
	cart.products.push(product);
	await Cart.findByIdAndUpdate(cart_id, { products: [...cart] });
	res.status(201).send(
		`Item ${product._id} added to Cart ${cart_id}`
	);
};

const removeFromCart = async (req, res, next) => {
    const cart_id = req.params.id;
	const { product } = req.body;
	if (!product) return next(new AppError("No Updates Values Found", 404));
	const cart = await Cart.findById(cart_id);
	const newCart = cart.products.filter(el => el !== product);
	await Cart.findByIdAndUpdate(cart_id, { products: [...newCart] });
	res.status(200).send(
		`Item ${product._id} removed from Cart ${cart_id}`
	);
}

const emptyCart = async (req, res, next) => {
    const cart_id = req.params.id;
	const cart = await Cart.findById(cart_id);
	const newCart = cart.products.filter(product => false);
	await Cart.findByIdAndUpdate(cart_id, { products: [...newCart] });
	res.status(200).send(
		`Cart ${cart_id} Has Been Emptied`
	);
}
const deleteCart = async (req, res, next) => {
    const cart_id = req.params.id;
	await Cart.findByIdAndDelete(cart_id);
	res.status(200).send(
		`Cart ${cart_id} has been deleted Successfully`
	);
};
const createCart = async (req, res, next) => {
	const newCart = new Cart({
		user: req.user._id,
		products:[],
	});
	if (!newCart) return next(new AppError(`Please Choose Your Products again`, 500));
	await newCart.save();

	res.status(200).send(newCart);
};

module.exports = {
	deleteCart,
	addToCart,
	removeFromCart,
	getUserCart,
	createCart,
    emptyCart
};
