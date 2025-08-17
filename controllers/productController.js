const asyncWrapper = require("../utils/asyncWrapper")
const ApiError = require("../utils/ApiError")
const { getDocument, deleteDocument } = require("../utils/handler")
const Product = require("../models/product")
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
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page - 1) * limit
    const minPrice = parseInt(req.query.minPrice) || 0
    const maxPrice = parseInt(req.query.maxPrice) || 0
    const size = req.query.size || ''
    // const colors = req.query.colors || []
    const color = req.query.color || '';
    const filter = {}
    if(req.query.category){
        filter.category = req.query.category
    }

    if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice }
    } else if (minPrice) {
        filter.price = { $gte: minPrice }
    } else if (maxPrice) {
        filter.price = { $lte: maxPrice }
    }

    // if(colors.length > 0){
    //     filter.colors = { $in: colors }
    // }
    if (color) {
        filter.color = color
    }

    if(size){
        filter.size = size
    }
    const products = await Product.find(filter).skip(skip).limit(limit).populate("category brand")
    const totalProducts = await Product.countDocuments(filter)
    return res.status(200).json({ page, limit, total: totalProducts, data: products })
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
})

exports.getProduct = getDocument(Product)
exports.deleteProduct = deleteDocument(Product)