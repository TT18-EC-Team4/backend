const router = require("express").Router();
const orderCtrl = require("../../controllers/orderCtrl");
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/authAdmin");

router
  .route("/orders")
  // .post(auth, orderCtrl.createOrder);
  .post(orderCtrl.getOrdersUser);

router
  .route("/orders/checkout")
  // .post(auth, orderCtrl.createOrder);
  .post(orderCtrl.createOrder);

router
  .route("/orders/:id")
  //   .put(auth, productCtrl.updateProduct);
  .put(orderCtrl.cancelOrder);

module.exports = router;
