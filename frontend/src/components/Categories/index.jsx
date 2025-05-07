import React from "react";
import PropTypes from "prop-types";

import "./index.css";

export default function Categories({ blog, removeCategory }) {
  if (!blog) {
    return null;
  }
  return (
    <div className="flex-wrap">
      {blog.categories.map((category, index) => {
        return (
          <p
            key={index}
            className="category-tag"
            style={{
              color: category.color,
              backgroundColor: category.color + "33",
            }}
          >
            {category.title}

            {removeCategory && (
              <i
                onClick={() => {
                  removeCategory(category);
                }}
                className="bi bi-x"
              ></i>
            )}
          </p>
        );
      })}
    </div>
  );
}

Categories.prototype = {
  blog: PropTypes.object.isRequired,
};
