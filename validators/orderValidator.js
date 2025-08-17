const { check, body } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const User = require("../models/user");
const statusOptions = ["pending", "processing", "complete", "canceled"];

exports.createOrderValidator = [
  // check("price")
  //   .notEmpty()
  //   .withMessage("Order price is required.")
  //   .isNumeric()
  //   .withMessage("Order price must be a number.")
  //   .custom((value) => {
  //     if (value < 0) {
  //       throw new Error("Order price must be greater than or equal to 0.");
  //     }
  //     if (value > 20000) {
  //       throw new Error("Order price must be less than or equal to 20000.");
  //     }
  //     return true;
  //   }),

  check("user")
    .notEmpty()
    .withMessage("Order must belong to a user.")
    .isMongoId()
    .withMessage("Invalid user ID format.")
    .custom((userId) =>
      User.findById(userId).then((user) => {
        if (!user) {
          return Promise.reject(new Error(`No user found for ID: ${userId}`));
        }
      })
    ),

  check("status")
    .optional()
    .isIn(statusOptions)
    .withMessage(
      `status must be one of the following: ${statusOptions.join(", ")}`
    ),

  validatorMiddleware,
];

exports.updateOrderValidator = [
  check("status")
    .optional()
    .isIn(statusOptions)
    .withMessage(
      `status must be one of the following: ${statusOptions.join(", ")}`
    ),

  validatorMiddleware,
];

exports.deleteOrderValidator = [
  check("id").isMongoId().withMessage("Invalid Order id format"),
  validatorMiddleware,
];

exports.getOrderValidator = [
  check("id").isMongoId().withMessage("Invalid Order id format"),
  validatorMiddleware,
];

exports.userOrderValidator = [
  check("userid")
    .notEmpty()
    .withMessage("Order must belong to a user.")
    .isMongoId()
    .withMessage("Invalid user ID format.")
    .custom((userId) =>
      User.findById(userId).then((user) => {
        if (!user) {
          return Promise.reject(new Error(`No user found for ID: ${userId}`));
        }
      })
    ),

  validatorMiddleware,
];