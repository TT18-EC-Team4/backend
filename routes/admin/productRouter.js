const router = require("express").Router();
const productCtrl = require("../../controllers/productCtrl");
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/authAdmin");

router
  .route("/products")
  .get(productCtrl.getProducts)
  // .post(auth, authAdmin, productCtrl.createProduct)
  .post(productCtrl.createProduct);

router
  .route("/products/:id")
  //   .delete(auth, authAdmin, productCtrl.deleteProduct)
  //   .put(auth, authAdmin, productCtrl.updateProduct);
  .delete(productCtrl.deleteProduct)
  .put(productCtrl.updateProduct);

module.exports = router;
