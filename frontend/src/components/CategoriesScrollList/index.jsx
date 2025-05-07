import React from "react";
import PropType from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CategoriesScrollList({ categoryId }) {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  return categories.map((category, index) => {
    return categoryId === category.id ? (
      <button
        key={index}
        onClick={() => {
          navigate("/blogs/");
        }}
        style={{ color: "blue" }}
      >
        <p key={index}>{category.title}</p>
      </button>
    ) : (
      <button
        key={index}
        onClick={() => {
          navigate("/blogs/" + category.id);
        }}
        style={{ color: "black" }}
      >
        <p key={index}>{category.title}</p>
      </button>
    );
  });
}

CategoriesScrollList.prototype = {
  categoryId: PropType.string.isRequired,
};
