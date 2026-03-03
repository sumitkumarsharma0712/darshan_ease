import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = () => process.env.JWT_SECRET || "testsecret";
const JWT_EXPIRES = "7d";

function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET(), {
    expiresIn: JWT_EXPIRES
  });
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || "",
    avatar: user.avatar || ""
  };
}

export async function register({ name, email, password }) {
  if (!name || !email || !password) {
    const err = new Error("Name, email, and password are required");
    err.status = 400;
    throw err;
  }
  if (password.length < 6) {
    const err = new Error("Password must be at least 6 characters");
    err.status = 400;
    throw err;
  }

  const exists = await User.findOne({ email: email.toLowerCase().trim() });
  if (exists) {
    const err = new Error("Email already registered");
    err.status = 400;
    throw err;
  }

  // SECURITY: always force role to USER on public registration
  const user = await User.create({ name, email, password, role: "USER" });
  const token = generateToken(user);
  return { user: sanitizeUser(user), token };
}

export async function login({ email, password }) {
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  const match = await user.comparePassword(password);
  if (!match) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  const token = generateToken(user);
  return { user: sanitizeUser(user), token };
}

export async function getProfile(userId) {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  return sanitizeUser(user);
}
