const { check, body } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const User = require("../models/user");
const statusOptions = ["pending", "processing", "completed", "canceled"];

exports.createOrderValidator = [
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