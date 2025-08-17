const { check, body } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const { Category } = require("../models/category");
const sizeOptions = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];

exports.createProductValidator = [
    check("title")
        .trim()
        .notEmpty().withMessage("Product title is required.")
        .isLength({ min: 3, max: 100 }).withMessage("Product title must be between 3 and 100 characters."),

    check("description")
        .trim()
        .notEmpty().withMessage("Product description is required.")
        .isLength({ min: 20 }).withMessage("Product description must be at least 20 characters long."),

    check("price")
        .notEmpty().withMessage("Product price is required.")
        .isNumeric().withMessage("Product price must be a number.")
        .custom((value) => {
            if (value < 0) {
                throw new Error("Product price must be greater than or equal to 0.");
            }
            if (value > 20000) {
                throw new Error("Product price must be less than or equal to 20000.");
            }
            return true;
        }),

    check("priceAfterDiscount")
        .optional()
        .isNumeric().withMessage("Product priceAfterDiscount must be a number.")
        .custom((val, { req }) => {
            if (val >= req.body.price) {
                throw new Error("Price after discount must be lower than the original price.");
            }
            return true;
        }),

    check("quantity")
        .notEmpty().withMessage("Product quantity is required.")
        .isNumeric().withMessage("Product quantity must be a number.")
        .custom((value) => {
            if (value < 0) {
                throw new Error("Product quantity must be greater than or equal to 0.");
            }
            return true;
        }),

    check("colors")
        .optional(),
    check("color")
        .optional(),


    body("imgCover")
        .custom((value, { req }) => {
            if (!req.files.imgCover) {
                throw new Error("Product image cover is required.");
            }
            return true;
        }),

    check("images")
        .optional(),


    check("ratingsAverage")
        .optional()
        .isNumeric().withMessage("ratingsAverage must be a number.")
        .isFloat({ min: 1, max: 5 }).withMessage("Rating must be between 1.0 and 5.0."),

    check("category")
        .notEmpty().withMessage("Product must belong to a category.")
        .isMongoId().withMessage("Invalid category ID format.")
        .custom((categoryId) =>
            Category.findById(categoryId).then((category) => {
                if (!category) {
                    return Promise.reject(new Error(`No category found for ID: ${categoryId}`));
                }
            })
        ),
        check("size")
        .optional() 
        .isIn(sizeOptions).withMessage(`Size must be one of the following: ${sizeOptions.join(", ")}`),


    validatorMiddleware
];

exports.updateProductValidator = [
    check("title")
        .trim()
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage("Product title must be between 3 and 100 characters."),

    check("description")
        .trim()
        .optional()
        .isLength({ min: 20 }).withMessage("Product description must be at least 20 characters long."),

    check("price")
        .optional()
        .isNumeric().withMessage("Product price must be a number.")
        .custom((value) => {
            if (value < 0) {
                throw new Error("Product price must be greater than or equal to 0.");
            }
            if (value > 20000) {
                throw new Error("Product price must be less than or equal to 20000.");
            }
            return true;
        }),

    check("priceAfterDiscount")
        .optional()
        .isNumeric().withMessage("Product priceAfterDiscount must be a number.")
        .custom((val, { req }) => {
            if (val >= req.body.price) {
                throw new Error("Price after discount must be lower than the original price.");
            }
            return true;
        }),

    check("quantity")
        .optional()
        .isNumeric().withMessage("Product quantity must be a number.")
        .custom((value) => {
            if (value < 0) {
                throw new Error("Product quantity must be greater than or equal to 0.");
            }
            return true;
        }),

    check("colors")
        .optional(),


    body("imgCover").optional(),


    check("images")
        .optional(),


    check("ratingsAverage")
        .optional()
        .isNumeric().withMessage("ratingsAverage must be a number.")
        .isFloat({ min: 1, max: 5 }).withMessage("Rating must be between 1.0 and 5.0."),

    check("category")
        .optional()
        .isMongoId().withMessage("Invalid category ID format.")
        .custom((categoryId) =>
            Category.findById(categoryId).then((category) => {
                if (!category) {
                    return Promise.reject(new Error(`No category found for ID: ${categoryId}`));
                }
            })
        ),

    validatorMiddleware
]

exports.deleteProductValidator = [
    check("id").isMongoId().withMessage("Invalid Product id format"),
    validatorMiddleware
]

exports.getProductValidator = [
    check("id").isMongoId().withMessage("Invalid Product id format"),
    validatorMiddleware
]