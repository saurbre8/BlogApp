const createCategory = async (category) => {
  try {
    const data = await fetch("http://localhost:8000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
      },
      body: JSON.stringify(category),
    });
    if (!data.ok) {
      throw Error(data.statusText);
    }
    const res = await data.json();
    return res;
  } catch (err) {
    throw Error(err);
  }
};

const getCategories = async () => {
  try {
    const data = await fetch("http://localhost:8000/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data.ok) {
      console.log(data.statusText);
      throw Error(data.statusText);
    }
    const res = await data.json();
    return res;
  } catch (err) {
    throw Error(err);
  }
};

const updateCategory = async (category) => {
  try {
    const data = await fetch(
      "http://localhost:8000/api/categories/" + category.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
        body: JSON.stringify(category),
      }
    );
    if (!data.ok) {
      console.log(data.statusText);
      throw Error(data.statusText);
    }
    const res = await data.json();
    return res;
  } catch (err) {
    throw Error(err);
  }
};

const deleteCategory = async (category) => {
  try {
    const data = await fetch(
      "http://localhost:8000/api/categories/" + category.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      }
    );
    if (!data.ok) {
      console.log(data.statusText);
      throw Error(data.statusText);
    }
    const res = await data.json();
    return res;
  } catch (err) {
    throw Error(err);
  }
};

const categoryService = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};

export default categoryService;
