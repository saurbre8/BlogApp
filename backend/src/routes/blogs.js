const express = require("express");
const blogsController = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multer");

const router = express.Router();

router.post("/", protect, upload.single("image"), (req, res) => {
  blogsController.createBlog(req, res);
});

router.get("/", (req, res) => {
  blogsController.getBlogs(req, res);
});

router.get("/:id", (req, res) => {
  blogsController.getBlogById(req, res);
});

router.get("/category/:id", (req, res) => {
  blogsController.getBlogByCategoryId(req, res);
});

router.get("/author/:id", (req, res) => {
  blogsController.getBlogByAuthorId(req, res);
});

router.put("/:id", protect, upload.single("image"), (req, res) => {
  blogsController.updateBlogById(req, res);
});

router.delete("/:id", protect, (req, res) => {
  blogsController.deleteBlogById(req, res);
});

module.exports = router;
