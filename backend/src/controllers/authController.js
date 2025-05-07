const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      // expiresIn: "1d",
    }
  );
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, bio, email, password } = req.body;
    //check payload
    if (!firstName || !lastName || !email || !bio || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      email,
      bio,
      password: hashedPassword,
    });
    const newUser = await user.save();
    let resUser = newUser.toJSON();
    delete resUser.password;
    resUser.token = generateToken(resUser);
    res.status(201).json({ message: "Registration complete", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check payload
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    // check hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Invalid credentials", data: [] });
      return;
    }
    let resUser = user.toJSON();
    delete resUser.password;
    resUser.token = generateToken(resUser);
    res.status(200).json({ message: "Login successful!", data: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    // check if user exists
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    delete user.password;
    res.status(200).json({ message: "Successfully found user!", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, bio, email, image } = req.body;
    const user = await User.findById(id);
    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.bio = bio || user.bio;
      user.email = email || user.email;
      user.image = image || user.image;
      const updatedUser = await user.save();
      res.status(200).json({ message: "User updated!", data: updatedUser });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    const message = error?.message ? error.message : "Internal server error";
    res.status(500).json({ message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
};
