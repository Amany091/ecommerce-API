const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImg,
  getCategory,
} = require("../controllers/categoryController");
const express = require("express");
const { createCategoryValidator, getCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require("../validators/categoryValidator");
const { authentication, allowedTo } = require("../middlewares/authMiddleware");
const router = express.Router();
// const multer = require("multer");

// const FILE_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype];
//     let uploadError = new Error("invalid image type");

//     if (isValid) {
//       uploadError = null;
//     }
//     cb(uploadError, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(" ").join("-");
//     const extension = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`);
//   },
// });

// const uploadOptions = multer({ storage: storage });

router
  .route("/")
  .get(getAllCategories)
  .post(authentication, allowedTo("admin"),uploadCategoryImg, createCategoryValidator,createCategory);
router
  .route("/:id")
  .get(getCategoryValidator,getCategory)
  .put(authentication, allowedTo("admin"),uploadCategoryImg, updateCategoryValidator,updateCategory)
  .delete(authentication, allowedTo("admin"),deleteCategoryValidator,deleteCategory);

module.exports = router;
