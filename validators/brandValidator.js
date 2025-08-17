const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const { Brand } = require("../models/brand");

exports.createBrandValidator = [
    check("name").notEmpty().withMessage("Brand name is required").trim().isLength({min:2}).withMessage("Brand name must be at least 2 characters long").isLength({max:20}).withMessage("Brand name must be at most 20 characters long")
    .custom((val) => {
        return Brand.findOne({ name: val }).then((brand) => {
            if (brand) {
                return Promise.reject(new Error("Brand name already in use"));
            }
        });
    }),

    check("logo").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Brand logo is required");
        }
        return true;
    }),
    validatorMiddleware
]

exports.getBrandValidator = [
    check("id").isMongoId().withMessage("Invalid brand id format"),
    validatorMiddleware
]

exports.updateBrandValidator = [
    check("id").isMongoId().withMessage("Invalid brand id format"),
    check("name").optional().trim().custom((val) => {
        return Brand.findOne({ name: val }).then((brand) => {
            if (brand) {
                return Promise.reject(new Error("Brand name already in use"));
            }
        });
    }),
    check("logo").optional(),
    validatorMiddleware
]
exports.deleteBrandValidator = [
    check("id").isMongoId().withMessage("Invalid brand id format"),
    validatorMiddleware
]