import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

// Get all users for sidebar (excluding logged-in user)
router.get("/users", protectRoute, getUsersForSidebar);

// Get all messages between logged-in user and selected user
router.get("/:id/messages", protectRoute, getMessages);

// Mark a specific message as seen
router.put("/messages/mark/:id", protectRoute, markMessageAsSeen);

// Send a message to a user
router.post("/send/:id", protectRoute, sendMessage);

export default router;
