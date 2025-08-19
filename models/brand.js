const mongoose = require("mongoose");
const {hostedImage} = require("../middlewares/uploadImgMiddleware")

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Brand name is required"],
    unique: true,
    trim: true,
    minlength: [2, "Brand name must be at least 2 characters long"], 
    maxlength: [200, "Brand name must be at most 20 characters long"], 
  },
  logo: {
    type: String,
    required: [true, "Brand logo is required"],  
  },
});

brandSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

brandSchema.set("toJSON", {
  virtuals: true,
});

hostedImage("brands", brandSchema, "logo")

exports.Brand = mongoose.model("Brand", brandSchema);
