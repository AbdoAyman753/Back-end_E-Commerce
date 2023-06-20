const AppError = require('./AppError');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  // checking if there is a token provided
  const token = req.headers.authorization;
  if (!token)
    return next(
      new AppError('No token provided, please provide a token!', 400)
    );

  // destructuring id from the payload
  const { id, role } = jwt.verify(token, 'mysecret');

  // logged in user
  // const user = await User.findById(id);
  // if (!user) return next(new AppError("User Not Found!", 400)); // This check is not necessary

  // req.user = user;
  next();
};

module.exports = verifyToken;
