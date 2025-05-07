const Blog = require("../models/Blog");
const {
  uploadToGoogleCloudStorage,
} = require("../services/google-cloud-storage");

const createBlog = async (req, res) => {
  try {
    let imageURL = "";
    if (req?.file?.path) {
      imageURL = await uploadToGoogleCloudStorage(req?.file?.path);
    }
    console.log(req.body);
    const categoryIds = JSON.parse(req?.body?.categories).map((x) => x.id);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      image: imageURL,
      content: JSON.parse(req?.body?.content),
      authorId: req.body.authorId,
      categoryIds: categoryIds,
    });

    const newBlog = await blog.save();

    const blogRes = await Blog.findById(newBlog._id)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });

    res.status(201).json({
      message: "Blog created!",
      data: blogRes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogsRed = await Blog.find()
      .populate({
        path: "authorId",
      })
      .populate({
        path: "categoryIds",
      });
    res.status(200).send({ message: "Return all blogs!", data: blogsRed });
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogsRed = await Blog.findById(req.params.id)
      .populate({
        path: "authorId",
      })
      .populate({
        path: "categoryIds",
      });
    res.status(200).send({ message: "Return blog by ID!", data: blogsRed });
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

const getBlogByCategoryId = async (req, res) => {
  try {
    let filter = {};
    if (req.params.id != "null" && req.params.id != "undefined") {
      filter = { categoryIds: req.params.id };
    }
    const blogsRed = await Blog.find(filter)
      .populate({
        path: "authorId",
      })
      .populate({
        path: "categoryIds",
      });
    res
      .status(200)
      .send({ message: "Return blog by category ID!", data: blogsRed });
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

const getBlogByAuthorId = async (req, res) => {
  try {
    let filter = {};
    if (req.params.id != "null" && req.params.id != "undefined") {
      filter = { authorId: req.params.id };
    }
    const blogsRed = await Blog.find(filter)
      .populate({
        path: "authorId",
      })
      .populate({
        path: "categoryIds",
      });
    res
      .status(200)
      .send({ message: "Return blog by authorID!", data: blogsRed });
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

const updateBlogById = async (req, res) => {
  try {
    console.log(req.body);
    const blog = await Blog.findById(req.params.id)
      .populate({
        path: "categoryIds",
      })
      .populate({ path: "authorId" });
    if (blog) {
      let imageURL = "";
      if (req?.file?.path) {
        imageURL = await uploadToGoogleCloudStorage(req?.file?.path);
        blog.image = imageURL;
      }
      if (req?.body?.categories) {
        const categoryIdsNew = JSON.parse(req.body.categories).map((x) => x.id);
        blog.categoryIds = categoryIdsNew;
      }
      blog.authorId = req?.body?.authorId || blog.authorId;
      blog.title = req?.body?.title || blog.title;
      blog.description = req?.body?.description || blog.description;
      blog.content = req.body.content
        ? JSON.parse(req.body.content)
        : blog.content;
      const updatedBlog = await blog.save();
      const blogRes = await updatedBlog.populate({
        path: "categoryIds",
      });
      res.status(200).json({ message: "Blog updated!", data: blogRes });
    } else {
      res.status(404).json({ message: "Blog not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: {failed: true} });
  }

};

const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const dbResponse = await Blog.findByIdAndDelete(blogId);
    if (dbResponse) {
      return res
        .status(200)
        .json({ message: "Blog deleted!", data: { id: blogId } });
    } else {
      return res.status(404).json({ message: "Blog not found!" });
    }
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  getBlogByCategoryId,
  getBlogByAuthorId,
  updateBlogById,
  deleteBlogById,
};
