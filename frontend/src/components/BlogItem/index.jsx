import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BlogItemText from "../BlogItemText";
import EditButtons from "../EditButtons";

import "./index.css";

export default function BlogItem({
  index,
  blog,
  imageOrientation,
  onBlogEdit,
  onBlogDelete,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isHovered, setIsHovered] = useState(false);

  const categoryColor = blog.categories[0]?.color || "#000"; // Default to black if no category color
  const navigate = useNavigate();

  const EditButtonsContainer = () => {
    return (
      <EditButtons
        onEdit={() => onBlogEdit(blog)}
        onDelete={() => onBlogDelete(blog)}
        onNavigate={() => {
          navigate("/blog/" + blog?.id);
        }}
      />
    );
  };

  const cardStyle = {
    boxShadow: isHovered ? `0px 0px 15px ${categoryColor}` : "none",
  };

  if (imageOrientation === "top") {
    return (
      <div
        key={index}
        className="card-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={cardStyle}
      >
        {onBlogEdit && onBlogDelete && user && user.token ? (
          <EditButtonsContainer />
        ) : null}
        <Link to={"/blog/" + blog.id} style={{ textDecoration: "none", color: "inherit" }}>
          <img src={blog.image} className="card-img-top" alt="..." />
          <div className="card-text-bottom">
            <BlogItemText blog={blog} headerFontSize="20px"></BlogItemText>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div
        key={index}
        className="card-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={cardStyle}
      >
        {onBlogEdit && onBlogDelete && user && user.token ? (
          <EditButtonsContainer />
        ) : null}
          <img src={blog.image} className="card-img-left" alt="..." />
          <div className="card-text-right">
            <BlogItemText blog={blog} headerFontSize="20px"></BlogItemText>
          </div>
      </div>
    );
  }
}

BlogItem.propTypes = {
  index: PropTypes.number.isRequired,
  blog: PropTypes.object.isRequired,
  imageOrientation: PropTypes.string.isRequired,
  onBlogEdit: PropTypes.func,
  onBlogDelete: PropTypes.func,
};