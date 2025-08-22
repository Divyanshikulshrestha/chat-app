import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
    mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
    mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));

    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) throw new Error("MONGODB_URI is not defined in .env");

    await mongoose.connect(`${mongoURI}/chat-app`);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
