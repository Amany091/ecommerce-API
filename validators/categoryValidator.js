const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const { Category } = require("../models/category");

exports.createCategoryValidator = [
    check("name").not().isEmpty().withMessage("Category name required").trim().isLength({min:6}).withMessage("Category name must be at least 6 characters long").isLength({max:32}).withMessage("Category name must be at most 20 characters long")
    .custom((val) => {
        return Category.findOne({ name: val }).then((cat) => {
            if (cat) {
                return Promise.reject(new Error("Category name already in use"));
            }
        });
    }),
    check("image").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Category image is required");
        }
        return true;
    }),
    validatorMiddleware
];

exports.getCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]

exports.updateCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),

    check("name").optional().isLength({min:6}).withMessage("Category name must be at least 6 characters long").isLength({max:32}).withMessage("Category name must be at most 20 characters long").custom((val) => {
        console.log(val);
        
        return Category.findOne({ name: val }).then((cat) => {
            if (cat) {
                return Promise.reject(new Error("Category name already in use"));
            }
        });
    }),
    check("image").optional(),
    validatorMiddleware
]

exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]