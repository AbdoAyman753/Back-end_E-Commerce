const User = require("../models/User");
const AppError = require("../utils/AppError");

const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
	const users = await User.find();
	res.send(users);
};

const getUserById = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) return next(new AppError("User Not Found!", 404));
	res.send(user);
};

const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	const createdUser = await User.create({
		user_name: username,
		email,
		password,
	});
	res.send({ message: "user created successfully!", user: createdUser });
};

const updateUser = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) return next(new AppError("User Not Found", 404));

	const { user_name, email, password, role, profile_pic, balance } = req.body;

	const editedUser = await User.findByIdAndUpdate(id, {
		user_name,
		email,
		password,
		role,
		profile_pic,
		balance,
	});
	res.send({ message: "user updated successfully!", editedUser });
};

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
	const user = await User.findOne({ email: email }).select("+password");
	if (!user) return next(new AppError("Invalid Credentials!", 400));

	// checking if the password is correct
	const isMatch = await user.comparePassword(password);
	if (!isMatch) return next(new AppError("Invalid Credentials!", 400));

	// creating a token
	const token = jwt.sign({ id: user._id, role: user.role }, process.env.ENCRYPTION_KEY);

	user.password = undefined;
	res.send({ message: "user logged in successfully!", user, token });
};

module.exports = {
	getAllUsers,
	getUserById,
	register,
	updateUser,
	deleteUser,
	login,
};