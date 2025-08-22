import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// Signup
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;
  try {
    if (!fullName || !email || !password || !bio)
      return res.status(400).json({ success: false, message: "Missing details" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "Account already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ fullName, email, password: hashedPassword, bio });
    const token = generateToken(newUser._id);

    res.status(201).json({ success: true, userData: newUser, token, message: "Account created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ success: true, userData: user, token, message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check auth
export const checkAuth = (req, res) => res.json({ success: true, user: req.user });

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;

    let updatedUser;
    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true });
    } else {
      updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
