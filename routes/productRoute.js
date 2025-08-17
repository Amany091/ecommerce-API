const { createProduct, getAllProducts, uploadProductImages, getProduct, deleteProduct, updateProduct } = require("../controllers/productController")
const { authentication, allowedTo } = require("../middlewares/authMiddleware")
const { createProductValidator, updateProductValidator, deleteProductValidator, getProductValidator } = require("../validators/productValidator")

const router = require("express").Router()

router.route("/").post(authentication, allowedTo("admin"),uploadProductImages,createProductValidator,createProduct)
                .get(getAllProducts)
router.route("/:id").put(authentication, allowedTo("admin"),uploadProductImages,updateProductValidator,updateProduct) 
                    .delete(authentication, allowedTo("admin"),deleteProductValidator,deleteProduct)
                    .get(getProductValidator,getProduct)                

module.exports = router