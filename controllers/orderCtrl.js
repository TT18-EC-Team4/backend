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
      const { id, userId, orders, total, orderDate, status } = req.body;
      if (!picture) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({
        name: name.toLowerCase(),
        author: author,
        publishedYear: publishedYear,
        cost: cost,
      });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      const newProduct = new Products({
        id,
        name: name.toLowerCase(),
        cost,
        author,
        publishedYear,
        picture,
        category,
        quantity,
        onDiscount,
        numOfReviews,
        ratePoint,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
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

  cancelProduct: async (req, res) => {
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
