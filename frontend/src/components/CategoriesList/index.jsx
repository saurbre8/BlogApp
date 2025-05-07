import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import "./index.css";
import EditButtons from "../EditButtons";

export default function CategoriesList({ onEdit, onDelete }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  const navigateToBlog = (categoryId) => {
    if (onEdit && onDelete) return;
    navigate("/blogs/" + categoryId);
  };

  if (!categories) {
    return null;
  }

  return (
    <div className="category-list">
      {categories.map((category) => {
        const isHovered = hoveredCategoryId === category.id;
        const cardStyle = {
          boxShadow: isHovered ? `0px 0px 10px ${category.color}` : "none",
        };

        return (
          <button
            key={category.id}
            className="card"
            style={{ borderRadius: "0px", border: "none", padding: "0px", ...cardStyle }}
            onClick={() => {
              navigateToBlog(category.id);
            }}
            onMouseEnter={() => setHoveredCategoryId(category.id)}
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <div
              className="card-body"
              style={{
                backgroundColor: category.color + "33",
                position: "relative",
                zIndex: 0,
                width: "100%",
              }}
            >
              <h5 className="card-title">{category.title}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                {category.description.substring(0, 100)} ...
              </p>
            </div>
            {onEdit && onDelete && user && user.token && (
              <EditButtons
                onNavigate={() => {
                  navigate("/blogs/" + category.id);
                }}
                onEdit={() => {
                  onEdit(category);
                }}
                onDelete={() => {
                  onDelete(category);
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

CategoriesList.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};