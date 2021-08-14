const router = require("express").Router();
const categoryCtrl = require("../../controllers/categoryCtrl");
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/authAdmin");

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  // .post(auth, authAdmin, categoryCtrl.createCategory);
  .post(categoryCtrl.createCategory);

router
  .route("/category/:id")
  // .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  // .put(auth, authAdmin, categoryCtrl.updateCategory);
  .delete(categoryCtrl.deleteCategory)
  .put(categoryCtrl.updateCategory);

module.exports = router;

// [
//     {
//         "_id": "611524b2b8eec2676fe54e2f",
//         "name": "Fiction",
//         "createdAt": "2021-08-12T13:40:02.074Z",
//         "updatedAt": "2021-08-12T13:40:02.074Z",
//         "__v": 0
//     },
//     {
//         "_id": "6116549731bbdf144c9dc1d5",
//         "name": "Romantic",
//         "createdAt": "2021-08-13T11:16:39.612Z",
//         "updatedAt": "2021-08-13T11:16:39.612Z",
//         "__v": 0
//     }
// ]
