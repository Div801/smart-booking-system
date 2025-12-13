import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "customer",
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { passwordHash: _omit, ...userData } = user.toObject();

    res.status(201).json({ user: userData, token });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { passwordHash, ...userData } = user.toObject();
    res.json({ user: userData, token });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: refreshTokenValue } = req.body;

  if (!refreshTokenValue) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshTokenValue,
      process.env.JWT_REFRESH_SECRET
    );
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const token = generateToken(user);
    return res.json({ token });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

const logoutUser = (req, res) => {
  return res.json({ message: "Logged out" });
};

export { registerUser, loginUser, refreshToken, logoutUser };
