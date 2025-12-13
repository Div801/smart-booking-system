import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Staff from "../models/Staff.js";

const createStaff = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, password, specialties = [] } = req.body;

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
      role: "staff",
    });

    const staff = await Staff.create({
      userId: user._id,
      specialties,
    });

    const { passwordHash: _omit, ...userData } = user.toObject();

    res.status(201).json({ user: userData, staff });
  } catch (error) {
    next(error);
  }
};

const getStaffList = async (req, res, next) => {
  try {
    const staff = await Staff.find().populate("userId");
    res.json(staff);
  } catch (error) {
    next(error);
  }
};

export { createStaff, getStaffList };
