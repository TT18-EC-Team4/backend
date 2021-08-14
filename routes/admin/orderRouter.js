const router = require("express").Router();
const orderCtrl = require("../../controllers/orderCtrl");
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/authAdmin");

router
  .route("/orders")
  //   .get(auth, authAdmin, orderCtrl.getOrdersAdmin);
  .get(orderCtrl.getOrdersAdmin);

router
  .route("/orders/:id")
  //   .put(auth, authAdmin, productCtrl.updateProduct);
  .put(orderCtrl.updateOrder);

module.exports = router;
