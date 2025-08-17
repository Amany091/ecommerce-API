const ApiError = require("../utils/ApiError");

module.exports = (asyncFn) => {
  return (req, res, next) => {
    Promise.resolve(asyncFn(req, res, next)).catch((error) => next(new ApiError(error.message, 500)));
  };
};
