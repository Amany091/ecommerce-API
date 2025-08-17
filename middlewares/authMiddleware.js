const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncWrapper = require("../utils/asyncWrapper");
const User = require("../models/user");

exports.authentication = asyncWrapper(async (req, res, next) => {
  let token;
  if (
    req.cookies.access_token &&
    req.cookies.access_token.startsWith("Bearer")
  ) {
    token = req.cookies.access_token.split(" ")[1];
  }
  if (!token)
    return next(new ApiError("You are not logged in, please login to access this route...", 401));
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // check if user exist
  const currentUser = await User.findById(decode.userId);
  if (!currentUser)
    return next(
      new ApiError(
        "The user that is belong to this token does no longer exist"
      ),
      401
    );
  req.user = currentUser;
  next();
})

exports.allowedTo = (...roles) => {
  return asyncWrapper(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route"),
        403
      );
    }
    next();
  });
}