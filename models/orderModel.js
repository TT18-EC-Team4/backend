const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   unique: true,
    //   trim: true,
    //   required: true,
    // },
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    orders: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      require: true,
    },
    orderDate: {
      type: Date,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "Pending",
    },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Orders", orderSchema);
