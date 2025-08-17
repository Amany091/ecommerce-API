const mongoose = require("mongoose");

// Define the product schema
const productSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Product title is required."],
        minlength: [3, "Product title must be at least 3 characters long."],
        maxlength: [100, "Product title must be at most 100 characters long."],
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Product description is required."],
        minlength: [20, "Product description must be at least 20 characters long."],
    },
    size : {
        type : String,
        enum : ["XX-Small" , "X-Small" , "Small" , "Medium" , "Large", "X-Large", "XX-Large","3X-Large","4X-Large"],
        default : "small"
    },
    price: {
        type: Number,
        required: [true, "Product price is required."],
        min: [0, "Product price must be greater than or equal to 0."],
        max: [20000, "Product price must be less than or equal to 20000."],
    },
    priceAfterDiscount: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required."],
        min: [0, "Product quantity must be greater than or equal to 0."],
    },
    colors: {
        type: [String],
    },
    color: {
        type: String,
    },
    imgCover: {
        type: String,
        required: [true, "Product image cover is required."],
    },
    images: {
        type: [String],
    },
    ratingsAverage: {
        type: Number,
        min: [1, "Product rating must be equal to or above 1.0."],
        max: [5, "Product rating must be equal to or below 5.0."],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Product must belong to a category."],
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
    },
}, { timestamps: true });

// productSchema.post('save', function(doc) {    
//     if (doc.imgCover) {                
//         const imgUrl = `${process.env.BASE_URL}/products/${doc.imgCover}`;        
//         doc.imgCover = imgUrl;
//     }
//     if (doc.images) {
//         doc.images = doc.images.map((image) => {
//             return `${process.env.BASE_URL}/products/${image}`;
//         });
//     }
//   });
  
//   // findOne , findAll , Update
//   productSchema.post('init', function(doc) {

//     if (doc.imgCover) {                
//         const imgUrl = `${process.env.BASE_URL}/products/${doc.imgCover}`;        
//         doc.imgCover = imgUrl;
//     }
//     if (doc.images) {
//         doc.images = doc.images.map((image) => {
//             return `${process.env.BASE_URL}/products/${image}`;
//         });
//     }
    
//   });
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
