const Orders = require("../models/orderModel");
const Products = require("../models/productModel");

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
      console.log(req.body.userID);
      const user = req.body.userID;
      let orders = await Orders.find({ userId: user });
      for (let i in orders) {
        let listName = [];
        const order = orders[i];
        for (let j in order.cart) {
          const item = order.cart[j];
          const ptr = await Products.findOne({ id: item });
          listName.push(ptr.name);
        }
        order.cart = listName;
      }

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
      const order = await Orders.findOneAndUpdate(
        { _id: req.params.id },
        {
          status: "Cancel",
        }
      );
      console.log(order);
      res.json({ msg: "Cancel your Order", newStatus: "Cancel" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = orderCtrl;
