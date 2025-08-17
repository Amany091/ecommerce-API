const ApiError = require("./ApiError")
const asyncWrapper = require("./asyncWrapper")

exports.deleteDocument = (Model)=>{
    
   return asyncWrapper(async(req,res,next)=>{
        const doc = await Model.findByIdAndDelete(req.params.id)
        if(!doc) return next(new ApiError(`No document for this ${req.params.id}`,404))
        return res.status(200).json({})
      })
}

exports.getDocument = (Model)=>{
    return asyncWrapper(async(req,res,next)=>{
        const doc = await Model.findById(req.params.id)
        if(!doc) return next(new ApiError(`No document for this ${req.params.id}`,404))
         return res.status(200).json({data:doc}) 
      })
}