const Category = require("../models/Category");

const createCategories = async (req, res) => {
  try {
    const category = new Category({
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    });
    const newCategory = await category.save();
    res.status(201).json({ message: "Created category!", data: newCategory });
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categoriesRes = await Category.find();
    res
      .status(200)
      .send({ message: "Return all categories!", data: categoriesRes });
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

const updateCategories = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.title = req?.body?.title || category.title;
      category.description = req?.body?.description || category.description;
      category.color = req?.body?.color || category.color;
      const updatedCategory = await category.save();
      res
        .status(200)
        .json({ message: "Category updated!", data: updatedCategory });
    } else {
      res.status(404).json({ message: "Category not found!" });
    }
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

const deleteCategories = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const dbResponse = await Category.findByIdAndDelete(categoryId);
    if (dbResponse) {
      return res
        .status(200)
        .json({ message: "Category deleted!", data: { id: categoryId } });
    } else {
      return res.status(404).json({ message: "Category not found!" });
    }
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

module.exports = {
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
};
