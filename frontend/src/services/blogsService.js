const createBlog = async (blog) => {
  try {
    const res = await fetch("http://localhost:8000/api/blogs", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
      },
      body: blog,
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw Error(err);
  }
};

const getBlogs = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw Error(err);
  }
};

const getBlogById = async (id) => {
  try {
    const res = await fetch("http://localhost:8000/api/blogs/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw Error(err);
  }
};

const getBlogsByCategoryId = async (categoryId) => {
  let categoryIdReq = categoryId ? categoryId : null;
  try {
    const res = await fetch(
      "http://localhost:8000/api/blogs/category/" + categoryIdReq,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw Error(err);
  }
};

const getBlogsByAuthorId = async (authorId) => {
  const response = await fetch(
    "http://localhost:8000/api/blogs/author/" + authorId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    let res = await response.json();
    throw res;
  }
  const responseData = await response.json();
  return responseData;
};

const updateBlog = async (blog) => {
  try {
    const res = await fetch("http://localhost:8000/api/blogs/" + blog.id, {
      method: "PUT",
      headers: {
        //"Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
      },
      body: blog,
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw Error(err);
  }
};

const deleteBlog = async (id) => {
  try {
    const res = await fetch("http://localhost:8000/api/blogs/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
      },
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw Error(err);
  }
};

const blogsService = {
  createBlog,
  getBlogs,
  getBlogById,
  getBlogsByCategoryId,
  getBlogsByAuthorId,
  updateBlog,
  deleteBlog,
};

export default blogsService;
