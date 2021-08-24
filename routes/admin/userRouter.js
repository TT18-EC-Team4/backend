const router = require("express").Router();
const userCtrl = require("../../controllers/userCtrl");
const auth = require("../../middleware/auth");

<<<<<<< HEAD
router.post("/login", userCtrl.login);
=======
router.post("/login", userCtrl.adminLogin);

router.post("/register", userCtrl.adminRegister);
>>>>>>> a2ef171fa242573b275566eb83866a6b71c8b99d

router.get("/logout", userCtrl.logout);

router.get("/infor", auth, userCtrl.getUser);

module.exports = router;
