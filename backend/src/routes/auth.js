const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", (req, res) => {
  authController.register(req, res);
});

router.post("/login", (req, res) => {
  authController.login(req, res);
});

router.get("/user/:id", (req, res) => {
  authController.getUser(req, res);
});

router.put("/user/:id", (req, res) => {
  authController.updateUser(req, res);
});

module.exports = router;
