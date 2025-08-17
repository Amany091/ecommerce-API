const { uploadSingleImg } = require("../middlewares/uploadImgMiddleware");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const asyncWrapper = require("../utils/asyncWrapper");

// upload single image
exports.uploadUserImg = uploadSingleImg("profileImg", "users", "user");

exports.createUser = asyncWrapper(async (req, res) => {
  if(req.file){
    req.body.profileImg = req.file.filename
  }
  const user = await User.create(req.body); 
  res.status(201).json({
    data: user
  });
});

exports.getUser = asyncWrapper(async(req,res,next)=>{
  const user = await User.findById(req.params.id).select('-password')
   if(!user) return next(new ApiError("user not found",404))
   return res.status(200).json({data:user}) 
})

exports.getAllUsers = asyncWrapper(async(req,res,next)=>{
  const page = +req.query.page || 1
  const limit = +req.query.limit || 10
  const skip = (page - 1) * limit

  const users = await User.find().select('-password').skip(skip).limit(limit)
  const totalUsers = await User.countDocuments()
  return res.status(200).json({length:users.length,total:totalUsers,page,limit,data:users})
})

exports.updateUser = asyncWrapper(async(req,res,next)=>{
  if(req.file){
    req.body.profileImg = req.file.filename
  }
  const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
  if(!user) return next(new ApiError("user not found",404))
  return res.status(200).json({data:user})
})

exports.deleteUser = asyncWrapper(async(req,res,next)=>{
  const user = await User.findByIdAndDelete(req.params.id)
  if(!user) return next(new ApiError("user not found",404))
  return res.status(200).json({})
})