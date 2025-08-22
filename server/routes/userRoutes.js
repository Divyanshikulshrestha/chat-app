import express from "express";
import { checkAuth, login, signup, updateProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

// User signup
router.post("/signup", signup);

// User login
router.post("/login", login);

// Update profile (protected)
router.put("/profile", protectRoute, updateProfile);

// Check authentication status (protected)
router.get("/auth-check", protectRoute, checkAuth);

export default router;
