import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  setAddCategory,
  setEditCategory,
} from "../../features/categoriesSlice";

import useCategories from "../../hooks/useCategories";

export default function AddEditCategoryModal() {
  const modalEl = document.getElementById("addEditCategoryModal");
  const addEditCategoryModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl]);

  const dispatch = useDispatch();
  const { createCategory, updateCategory } = useCategories();

  const { addCategory, editCategory } = useSelector(
    (state) => state.categories
  );

  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (addCategory) {
      setCategory(addCategory);
      addEditCategoryModal?.show();
    } else if (editCategory) {
      setCategory(editCategory);
      addEditCategoryModal?.show();
    }
  }, [addCategory, editCategory, addEditCategoryModal]);

  const onSubmit = (e) => {
    e?.preventDefault();
    if (isFormValid()) {
      if (addCategory) {
        createCategory(category);
      } else if (editCategory) {
        updateCategory(category);
      }
      resetCategory();
      addEditCategoryModal?.hide();
    }
  };

  const onCloseModal = () => {
    resetCategory();
    onClose();
    addEditCategoryModal.hide();
  };

  const onClose = () => {
    dispatch(setAddCategory(null));
    dispatch(setEditCategory(null));
  };

  const resetCategory = () => {
    setCategory(null);
  };

  const isFormValid = () => {
    const form = document.getElementById("categoryForm");
    form?.classList?.add("was-validated");
    return form?.checkValidity();
  };

  return (
    <div
      className="modal fade"
      id="addEditCategoryModal"
      aria-labelledby="addEditCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addEditCategoryModalLabel">
              {(addCategory && "Add Category") || "Edit Category"}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form id="categoryForm">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={category?.title}
                  onChange={(e) => {
                    setCategory({ ...category, title: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={category?.description}
                  onChange={(e) => {
                    setCategory({ ...category, description: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="form-label">
                  Color Hexadecimal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  value={category?.color}
                  onChange={(e) => {
                    setCategory({ ...category, color: e.target.value });
                  }}
                  required
                ></input>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={onSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddEditCategoryModal.prototype = {};
