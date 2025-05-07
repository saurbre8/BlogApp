import React from "react";
import BlogItem from "../BlogItem";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";

import { setEditBlog, setDeleteBlog } from "../../features/blogsSlice";

export default function BlogList() {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);

  const onBlogEdit = (blog) => {
    dispatch(setEditBlog(blog));
  };
  const onBlogDelete = (blog) => {
    dispatch(setDeleteBlog(blog));
  };

  if (!blogs || !blogs.length) {
    return null;
  }

  return (
    <div className="blog-grid">
      {blogs?.map((blog, index) => {
        return (
          <BlogItem
            key={index}
            blog={blog}
            imageOrientation={"top"}
            onBlogEdit={onBlogEdit}
            onBlogDelete={onBlogDelete}
          />
        );
      })}
    </div>
  );
}

BlogList.prototype = {};
