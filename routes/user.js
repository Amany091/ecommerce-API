const {
  createUser,
  uploadUserImg,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/userController");
const { authentication, allowedTo } = require("../middlewares/authMiddleware");
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../validators/userValidator");
const router = require("express").Router();

router
  .route("/")
  .post(authentication, allowedTo("admin"),uploadUserImg, createUserValidator, createUser)
  .get(authentication, allowedTo("admin"),getAllUsers);
router
  .route("/:id")
  .get(authentication, allowedTo("admin"),getUserValidator, getUser)
  .put(authentication, allowedTo("admin"),uploadUserImg, updateUserValidator, updateUser)
  .delete(authentication, allowedTo("admin"),deleteUserValidator, deleteUser);
module.exports = router;
