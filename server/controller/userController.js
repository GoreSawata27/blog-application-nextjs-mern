import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: user.generateAuthToken(),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: user.generateAuthToken(),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export { registerUser, loginUser, getAllUsers, getUserById };
