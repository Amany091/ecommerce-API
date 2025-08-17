const { uploadSingleImg } = require("../middlewares/uploadImgMiddleware");
const { Category } = require("../models/category");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");
const {getDocument,deleteDocument} = require("../utils/handler")
//upload single image
exports.uploadCategoryImg = uploadSingleImg(
  "image",
  "categories",
  "category"
);

exports.getAllCategories = asyncWrapper(async (req, res, next) => {
  const page = +req.query.page || 1;  
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit);
  const totlaCategories = await Category.countDocuments();
  res.status(200).json({ page, limit, total: totlaCategories, data: categories });
});

exports.getCategory = getDocument(Category);

exports.createCategory = asyncWrapper(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  const category = await Category.create(req.body);
  res.status(201).json({
    data: category,
  });
});

exports.updateCategory = asyncWrapper(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    data: category,
  })});

exports.deleteCategory = deleteDocument(Category);
