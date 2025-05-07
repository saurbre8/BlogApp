import { useDispatch } from "react-redux";

import {
  createBlog as createBlogAction,
  updateBlogById,
  deleteBlogById,
  setAddBlog,
} from "../features/blogsSlice";

const useBlogs = () => {
  const dispatch = useDispatch();

  const onBlogAdd = () => {
    dispatch(
      setAddBlog({
        // image: "",
        title: "",
        description: "",
        categories: [],
        content: [
          {
            sectionHeading: "",
            sectionText: "",
          },
        ],
        authorId: JSON.parse(localStorage.getItem("user"))?._id,
      })
    );
  };

  const createBlog = async (blog) => {
    dispatch(createBlogAction(blog));
  };

  const updateBlog = async (blog) => {
    dispatch(updateBlogById(blog));
  };

  const removeBlog = async (blog) => {
    dispatch(deleteBlogById(blog.id));
  };

  return {
    onBlogAdd,
    createBlog,
    updateBlog,
    removeBlog,
  };
};

export default useBlogs;
