import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import Subheading from "../../components/Subheading";
import CategoriesList from "../../components/CategoriesList";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

import AddEditCategoryModal from "../../components/AddEditCategoryModal";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";

import {
  fetchCategories,
  setEditCategory,
  setDeleteCategory,
  resetSuccessAndError,
} from "../../features/categoriesSlice";

import useCategories from "../../hooks/useCategories";

export default function CategoriesPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { onCategoryAdd } = useCategories();
  const { isLoading, message, isError, isSuccess } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const fetchPageData = async () => {
      dispatch(fetchCategories());
    };
    fetchPageData();
  }, []);

  const AddButton = () => {
    return (
      <button className="btn btn-outline-dark my-4" onClick={onCategoryAdd}>
        ADD CATEGORY
      </button>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="flex-sub-heading">
          <Subheading subHeading={"Categories"} />
          {user && user.token && <AddButton />}
        </div>
        <CategoriesList
          onEdit={(editBlog) => {
            dispatch(setEditCategory(editBlog));
          }}
          onDelete={(deleteCategory) => {
            dispatch(setDeleteCategory(deleteCategory));
          }}
        />
        <Footer />
      </div>
      <AddEditCategoryModal />
      <DeleteCategoryModal />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
    </>
  );
}
