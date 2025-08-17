const Order = require("../models/order");
const asyncWrapper = require("../utils/asyncWrapper");

exports.payment = asyncWrapper(async (req, res) => {
    const orders = req.body
    const total = orders.reduce((val, sum) => val + sum, 0);
})