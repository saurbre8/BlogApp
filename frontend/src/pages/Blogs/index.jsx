import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import CategoriesScrollList from "../../components/CategoriesScrollList";
import Loader from "../../components/Loader";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";

import {
  fetchBlogsByCategoryId,
  resetSuccessAndError,
} from "../../features/blogsSlice";

import { fetchCategories } from "../../features/categoriesSlice";

import useBlogs from "../../hooks/useBlogs";

export default function BlogsPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { onBlogAdd } = useBlogs();

  const {
    isLoading: isBlogsLoading,
    message: blogsMessage,
    isSuccess: isBlogsSuccess,
    isError: isBlogsError,
  } = useSelector((state) => state.blogs);

  const {
    isLoading: isCategoryLoading,
    message: categoryMessage,
    isSuccess: isCategorySuccess,
    isError: isCategoryError,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchBlogsByCategoryId(categoryId));
      dispatch(fetchCategories());
    }
    fetchData();
  }, [categoryId]);

  const AddButton = () => {
    return (
      <button className="btn btn-outline-dark my-4" onClick={onBlogAdd}>
        ADD BLOG
      </button>
    );
  };

  if (isBlogsLoading || isCategoryLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesScrollList categoryId={categoryId} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
          {user && user?.token && <AddButton />}
        </div>
        <BlogList />
      </div>
      <Footer />
      <SuccessToast
        show={isBlogsSuccess || isCategorySuccess}
        message={blogsMessage || categoryMessage}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
      <ErrorToast
        show={isBlogsError || isCategoryError}
        message={blogsMessage || categoryMessage}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
      <AddEditBlogModal />
      <DeleteBlogModal />
    </>
  );
}
