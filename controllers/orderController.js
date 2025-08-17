const asyncWrapper = require("../utils/asyncWrapper");
const { getDocument, deleteDocument } = require("../utils/handler");
const Order = require("../models/order");
const { OrderItem } = require("../models/order-item");

exports.createOrder = asyncWrapper(async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems:orderItemsIdsResolved,
    user: req.body.user,
    price: totalPrice,
    status: req.body.status,
  });
  order = await order.save();
  // const order = await Order.create(req.body);
  return res.status(201).json({ data: order });
});

exports.getAllOrders = asyncWrapper(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const orderList = await Order.find()
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    })
    .sort({ dateOrdered: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({ page, limit, data: orderList });
});

exports.updateOrder = asyncWrapper(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  return res.status(200).json({ data: order });
});

exports.getOrder = asyncWrapper(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  return res.status(200).json({ data: order });
});

exports.deleteOrder = deleteDocument(Order);

// total price of all orders in the system
exports.getOrdersPrice = asyncWrapper(async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$price" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }

  res.send({ totalsales: totalSales.pop().totalsales });
});

// number of orders
exports.getOrdersCount = asyncWrapper(async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    if (!orderCount && orderCount !== 0) {
      return res.status(500).json({ success: false });
    }

    res.send({
      orderCount: orderCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// search by user
exports.getUserOrders = asyncWrapper(async (req, res) => {
  const userOrderList = await Order.find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    })
    .sort({
      dateOrdered: -1,
    });

  return res.status(201).json({ data: userOrderList });
});
