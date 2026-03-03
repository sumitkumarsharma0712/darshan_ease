import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const secret = process.env.JWT_SECRET || "testsecret";
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (roles.length && !roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
