import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import asyncHandler from "../utils/asyncHandler.js";

const createToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  const allowedRoles = ["customer", "admin"];

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email already registered",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = createToken(user._id, user.role);

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = createToken(user._id, user.role);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    data: {
      
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
export {
  addUser,
  getMe,
  loginUser,
};