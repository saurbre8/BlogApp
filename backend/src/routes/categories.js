const express = require("express");
const categoriesController = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, (req, res) => {
  categoriesController.createCategories(req, res);
});

router.get("/", (req, res) => {
  categoriesController.getCategories(req, res);
});

router.put("/:id", protect, (req, res) => {
  categoriesController.updateCategories(req, res);
});

router.delete("/:id", protect, (req, res) => {
  categoriesController.deleteCategories(req, res);
});

module.exports = router;
