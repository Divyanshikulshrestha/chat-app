import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// ===============================
// Create Express app & HTTP server
// ===============================
const app = express();
const server = http.createServer(app);

// ===============================
// Initialize Socket.io
// ===============================
export const io = new Server(server, {
  cors: { origin: "*" }, // In production, replace "*" with your frontend URL
});

// Store online users
export const userSocketMap = {};

// Handle socket.io connections
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("User connected:", userId);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      console.log("User disconnected:", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

// ===============================
// Middleware
// ===============================
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// ===============================
// Routes
// ===============================
app.get("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// ===============================
// Database Connection
// ===============================
await connectDB();

// ===============================
// Start Server
// ===============================
if(process.env.NODE_ENV !== "production"){
  const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
}

// Export server for Vercel
export default server