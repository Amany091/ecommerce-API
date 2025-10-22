const asyncWrapper = require("../utils/asyncWrapper")
const ApiError = require("../utils/ApiError")
const { getDocument, deleteDocument } = require("../utils/handler")
const Product = require("../models/product")
const paginate = require('../utils/paginate')
const { uploadMixOfImages } = require("../middlewares/uploadImgMiddleware")
exports.uploadProductImages = uploadMixOfImages([
    { name: 'imgCover', maxCount: 1 },
    { name: 'images', maxCount: 5 }
], "products", "product")

exports.createProduct = asyncWrapper(async (req, res) => {

    if (req.files) {
        req.body.imgCover = req.files.imgCover[0].filename

        if (req.files.images) {
            req.body.images = []
            for (const file of req.files.images) {
                req.body.images.push(file.filename)
            }
        }
    }

    const product = await Product.create(req.body)
    return res.status(201).json({ data: product })
})

exports.getAllProducts = asyncWrapper(async (req, res) => {
      const { page, limit, minPrice, maxPrice, size, color, category, type } =req.query;
    const filter = {};

    if (category) filter.category = category;

    if (minPrice && maxPrice) {
        filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
        filter.price = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
        filter.price = { $lte: parseInt(maxPrice) };
    }

    if (color) filter.color = color;
    if (size) filter.size = size;
    if (type) filter.type = type;

    const data = await paginate(
      Product,
      filter,
      { page, limit },
      "category brand"
    );

    return res.status(200).json({
      success: true,
      products: data.results,
      pagination: data.pagination
    });
})


exports.updateProduct = asyncWrapper(async (req, res) => {
    if (req.files) {
        if (req.files.imgCover) {
            req.body.imgCover = req.files.imgCover[0].filename
        }

        if (req.files.images) {
            req.body.images = []
            for (const file of req.files.images) {
                req.body.images.push(file.filename)
            }
        }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(200).json({ data: product })
});

exports.deleteProduct = asyncWrapper(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
        return next(new ApiError(`No product found for this id ${req.params.id}`, 404))
    }
    return res.status(204).send().status({ message: "Product deleted successfully" });
})

exports.getProduct = getDocument(Product)
exports.deleteProduct = deleteDocument(Product)