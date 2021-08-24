const router = require("express").Router();
const userCtrl = require("../../controllers/userCtrl");
const auth = require("../../middleware/auth");

<<<<<<< HEAD
router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);
=======
router.post("/register", userCtrl.userRegister);

router.post("/login", userCtrl.userLogin);
>>>>>>> a2ef171fa242573b275566eb83866a6b71c8b99d

router.get("/logout", userCtrl.logout);

// router.get("/refresh_token", userCtrl.refreshToken);

router.get("/infor", auth, userCtrl.getUser);

module.exports = router;
