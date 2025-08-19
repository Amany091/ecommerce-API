const mongoose = require("mongoose");
const { hostedImage } = require("../middlewares/uploadImgMiddleware");


const categorySchema = mongoose.Schema({
  name: {
    type : String,
    trim : true,
    unique : [true , "Category name must be unique"],
    required : [true,"Category name required"],
    minlength : [6 , "Category name must be at least 6 characters long"],
    maxlength : [32,"Category name must be at most 20 characters long"]
  },
  image: {
    type: String,
    required : [true,"Category image required"],
  },
});

categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});

hostedImage("categories", categorySchema, "image")

exports.Category = mongoose.model("Category", categorySchema);
