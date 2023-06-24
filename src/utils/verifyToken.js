const User = require('../models/User');
const AppError = require('./AppError');
const jwt = require('jsonwebtoken');

// verify req have token and based on token asingn the user to the req
const verifyToken = async (req, res, next) => {
  // checking if there is a token provided
  const token = req.headers.authorization;
  if (!token)
    return next(
      new AppError('No token provided, please provide a token!', 400)
    );

  // destructuring id from the payload
  const { id, role } = jwt.verify(token, process.env.ENCRYPTION_KEY);

  // logged in user
  const user = await User.findById(id);
  if (!user) return next(new AppError('User Not Found!', 400)); // This check is not necessary

  req.user = user;
  next();
};

module.exports = verifyToken;
