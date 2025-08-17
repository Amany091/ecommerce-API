const { check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const User = require('../models/user');
require('dotenv').config();

exports.signupValidator = [
  check('name')
    .notEmpty()
    .withMessage(process.env.USER_NAME_REQUIRED)
    .isLength({ min: 3 })
    .withMessage(process.env.USER_NAME_TOO_SHORT),

  check('email')
    .notEmpty()
    .withMessage(process.env.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(process.env.INVALID_EMAIL)
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error(process.env.EMAIL_ALREADY_IN_USE);
      }
    }),

  check('password')
    .notEmpty()
    .withMessage(process.env.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(process.env.PASSWORD_TOO_SHORT)
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error(process.env.PASSWORD_CONFIRM_MISMATCH);
      }
      return true;
    }),

  check('passwordConfirm')
    .notEmpty()
    .withMessage(process.env.PASSWORD_CONFIRM_REQUIRED),

  validatorMiddleware,
];

exports.loginValidator = [
  check('email')
    .notEmpty()
    .withMessage(process.env.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(process.env.INVALID_EMAIL),

  check('password')
    .notEmpty()
    .withMessage(process.env.PASSWORD_REQUIRED)
    .isLength({ min: 6 })
    .withMessage(process.env.PASSWORD_TOO_SHORT),

  validatorMiddleware,
];
