const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

// router.get('/emailSearch/:email', UserController.emailSearch);
router.get("/:id", UserController.getUser);
router.get("/", UserController.indexUsers);
router.post("/", UserController.create);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.destroy);

module.exports = router;
