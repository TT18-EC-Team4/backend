const Orders = require("../models/orderModel");

const orderCtrl = {
  getOrdersAdmin: async (req, res) => {
    try {
      const orders = await Orders.find({});

      res.json({
        status: "success",
        result: orders.length,
        orders: orders,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getOrdersUser: async (req, res) => {
    try {
      const user = req.body;
      const orders = await Orders.find({ userId: user });

      res.json({
        status: "success",
        result: orders.length,
        orders: orders,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { userId, orders, total, orderDate, status } = req.body;

      const order = await Orders.find({});
      const length = order.length;
      const id = "need code here";
      const newOrder = new Orders({
        id,
        userId,
        orders,
        total,
        orderDate,
        status,
      });

      await newOrder.save();
      res.json({ msg: "Created a order", id: id });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const status = req.body;
      await Orders.findOneAndUpdate(
        { _id: req.params.id },
        {
          status: status,
        }
      );
      res.json({ msg: `Updated a Order status to ${status}` });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  cancelOrder: async (req, res) => {
    try {
      await Orders.findOneAndUpdate(
        { _id: req.params.id },
        {
          status: "cancel",
        }
      );
      res.json({ msg: "Cancel your Order" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = orderCtrl;
