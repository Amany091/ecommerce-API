const mongoose = require("mongoose");

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
// brandSchema.post('save', function(doc) {    
//   if (doc.logo) {                
//       const imgUrl = `${process.env.BASE_URL}/brands/${doc.logo}`;        
//       doc.logo = imgUrl;
//   }
// });

// // findOne , findAll , Update
// brandSchema.post('init', function(doc) {
//   if (doc.logo) {
//       const imgUrl = `${process.env.BASE_URL}/brands/${doc.logo}`;
//       doc.logo = imgUrl;
//   }
// });

exports.Brand = mongoose.model("Brand", brandSchema);
