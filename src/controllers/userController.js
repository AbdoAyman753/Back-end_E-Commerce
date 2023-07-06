const User = require("../models/User");
const AppError = require("../utils/AppError");

const jwt = require("jsonwebtoken");

const { multerUploads, dataUri } = require("../utils/multer");
const { uploader } = require("../utils/config/cloudinaryConfig");
const Library = require("../models/Library");
const Wishlist = require("../models/Wishlist");
const Cart = require("../models/Cart");
const Order = require('../models/Order');
const getAllUsers = async (req, res, next) => {
	const users = await User.find();
	res.send(users);
};

const getUserById = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) return next(new AppError("User Not Found!", 404));
	// user.orders = Order.find({ user: user._id});
	res.send(user);
};

const register = async (req, res, next) => {
	const { user_name, email, password } = req.body;
	if(await User.findOne({ email})){
		res.status(409).send({message: "This Email already registered"});
	}
	let createdUser = await User.create({
		user_name,
		email,
		password,
	});
	const userLibrary = await Library.create({products:[],user:createdUser._id});
	const userWishlist = await Wishlist.create({products:[],user:createdUser._id});
	const userCart = await Cart.create({products:[],user:createdUser._id});
	await User.findByIdAndUpdate(createdUser._id,
		{	library:userLibrary._id,
			wishlist:userWishlist._id,
			cart:userCart._id
		});
	// .populate('library');
	res.status(201).send({ message: "User created successfully!" });
};

const updateUser = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) return next(new AppError("User Not Found", 500));

	let { user_name, balance } = req.body;
	if(balance){
		balance = +balance + +user.balance;
	}

	const editedUser = await User.findByIdAndUpdate(id, {
		user_name,
		balance,
	},{new:true});
	res.send({ message: "user updated successfully!", editedUser });
};

const uploadUserPic = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) return next(new AppError("User Not Found", 404));

	if (req.file) {
		const file = dataUri(req.file);
		const profile_pic = await uploader.upload(file.content , { public_id: req.file.originalname , folder:"profile_pics"});
		const updatedUser = await User.findByIdAndUpdate(id, { profile_pic:profile_pic.url }, {new:true});
		res.send({
			messge: "Your image has been uploded successfully to cloudinary",
			updatedUser
		});
	}
	else{
		res.status(404).send({
			messge: "No Image Found"
		});
	}
	
};

const updateRole = async (req, res, next) => {
	const  admin  = req.user;
	let { user_id,  role } = req.body;
	
	const editedUser = await User.findByIdAndUpdate(user_id, {role},{new:true});
	res.send({ message: "user Role updated successfully!", editedUser });
};

const changePassword = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id).select("+password");
	if (!user) return next(new AppError("User Not Found", 404));

	let { currentPassword, newPassword, confirmPassword } = req.body;
	
	const isMatch = await user.comparePassword(currentPassword);
	if (!isMatch) return next(new AppError("Invalid Credentials!", 400));
	
	if(newPassword !== confirmPassword){
		return next(new AppError('Password mismatch', 403));
	}

	const editedUser = await User.findByIdAndUpdate(id, { password: await bcrypt.hash(
			newPassword,
			+process.env.HASHING_COST
		)},{new:true});
	res.send({ message: "Password updated successfully!", editedUser });
}

const deleteUser = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) return next(new AppError("User Not Found!", 404));

	const deletedUser = await User.findByIdAndDelete(id);

	res.send({ message: "user deleted successfully!", deletedUser });
};

const login = async (req, res, next) => {
	// checking if the email exists
	const { email, password } = req.body;
	const user = await User.findOne({ email: email }).select("+password")
	// .populate({path:'library',select:''});
	if (!user) return next(new AppError("Invalid Credentials!", 400));

	// checking if the password is correct
	const isMatch = await user.comparePassword(password);
	if (!isMatch) return next(new AppError("Invalid Credentials!", 400));

	// creating a token
	const token = jwt.sign(
		{ id: user._id, role: user.role },
		process.env.ENCRYPTION_KEY
	);
	// user.orders = [{_id:'64916a0c08962c2104bd4058'}];
	// user.orders.push( await Order.find({ user: user._id}) );
	user.password = undefined;
	res.send({ message: "user logged in successfully!", user, token });
};

module.exports = {
	getAllUsers,
	getUserById,
	register,
	updateUser,
	uploadUserPic,
	updateRole,
	changePassword,
	deleteUser,
	login,
};
