const router = require("express").Router();
const userCtrl = require("../../controllers/userCtrl");
const auth = require("../../middleware/auth");

router.post("/login", userCtrl.adminLogin);

router.post("/register", userCtrl.adminRegister);

router.get("/logout", userCtrl.logout);

router.get("/infor", auth, userCtrl.getUser);

module.exports = router;
