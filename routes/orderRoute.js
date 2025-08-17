const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrdersPrice,
  getOrdersCount,
  getUserOrders,
} = require("../controllers/orderController");
const {
  createOrderValidator,
  updateOrderValidator,
  deleteOrderValidator,
  getOrderValidator,
  userOrderValidator,
} = require("../validators/orderValidator");

const Order = require("../models/order");
const express = require("express");
const router = express.Router();

router.route("/").post(createOrderValidator, createOrder).get(getAllOrders);

router
  .route("/:id")
  .put(updateOrderValidator, updateOrder)
  .delete(deleteOrderValidator, deleteOrder)
  .get(getOrderValidator, getOrder);

// total price of all orders in the system
router.route("/get/totalsales").get(getOrdersPrice);

// number of orders
router.route("/get/count").get(getOrdersCount);

// search by user
router.route(`/get/userorders/:userid`).get(userOrderValidator, getUserOrders);

module.exports = router;
