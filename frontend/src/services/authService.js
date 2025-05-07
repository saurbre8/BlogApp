const register = async (data) => {
  try {
    const res = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user.data));
    return user;
  } catch (error) {
    throw Error(error);
  }
};

const login = async (data) => {
  try {
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user.data));
    return user;
  } catch (error) {
    throw Error(error);
  }
};

const getUser = async (authorId) => {
  const response = await fetch(
    `http://localhost:8000/api/auth/user/${authorId}`
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const updateUser = async (userId, userData) => {
  const response = await fetch(
    `http://localhost:8000/api/auth/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
      },
      body: userData,
    }
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const authService = {
  register,
  login,
  getUser,
  updateUser,
};

module.exports = authService;
