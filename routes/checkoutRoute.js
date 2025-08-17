const stripe = require("stripe");
const checkoutPaymentValidator = require("../validators/paymentValidator");
const { payment } = require("../controllers/paymentController");
const router = require("express").Router()

router.route("add-payment-checkout").post(checkoutPaymentValidator, payment)

module.exports = router