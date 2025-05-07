import { useDispatch } from "react-redux";

import {
  setAddCategory,
  createCategory as createCategoryAction,
  updateCategoryById,
  deleteCategoryById,
} from "../features/categoriesSlice";

const useCategories = () => {
  const dispatch = useDispatch();

  const onCategoryAdd = () => {
    dispatch(
      setAddCategory({
        title: "",
        description: "",
        color: "",
      })
    );
  };

  const createCategory = async (blog) => {
    dispatch(createCategoryAction(blog));
  };

  const updateCategory = async (blog) => {
    dispatch(updateCategoryById(blog));
  };

  const removeCategory = async (blog) => {
    dispatch(deleteCategoryById(blog));
  };

  return {
    onCategoryAdd,
    createCategory,
    updateCategory,
    removeCategory,
  };
};

export default useCategories;
