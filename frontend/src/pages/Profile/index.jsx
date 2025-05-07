import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../../components/Navbar";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import { fetchBlogsByAuthorId } from "../../features/blogsSlice";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const { blogs, isLoading } = useSelector((state) => state.blogs);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchBlogsByAuthorId(user._id));
    }
    fetchData();
  }, [dispatch, user._id]);

  const AuthorDetails = () => {
    return (
      <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
        <div className="position-sticky my-5" style={{ top: "2rem" }}>
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic">
              {user.firstName} {user.lastName}
            </h4>
            <img src={user.image} className="avatar" alt="..." />
            <p>{user.bio.substring(0, 100)}...</p>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <AuthorDetails />
        <p className="page-subtitle">Author Blog Posts</p>
        <BlogList />
        <Footer />
      </div>
    </>
  );
}