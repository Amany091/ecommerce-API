const { uploadSingleImg } = require("../middlewares/uploadImgMiddleware");
const { Brand } = require("../models/brand");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");
const { deleteDocument, getDocument } = require("../utils/handler");

exports.getAllBrands = asyncWrapper(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const brands = await Brand.find().skip(skip).limit(limit);
  const totalBrands = await Brand.countDocuments();
  return res.status(200).json({page,limit,total : totalBrands , data : brands});
});

exports.getBrand = getDocument(Brand)



exports.uploadBrandImg = uploadSingleImg("logo","brands","brand");


exports.createBrand = asyncWrapper(async (req, res, next) => {
  if(req.file){    
    req.body.logo = req.file.filename
  }
  const brand = await Brand.create(req.body)
  return res.status(201).json({data : brand})
});

exports.updateBrand = asyncWrapper(async (req, res, next) => {
  if(req.file){
    req.body.logo = req.file.filename
  }
  const brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
  if(!brand) return next(new ApiError("brand not found",404))
  return res.status(200).json({data:brand})
});

exports.deleteBrand = deleteDocument(Brand)

