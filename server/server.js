import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/darshanease";

async function start() {
  try {
    await connectDB(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 API docs: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    console.error("");
    console.error("💡 Make sure MongoDB is running. Options:");
    console.error("   1. Install MongoDB Community: https://www.mongodb.com/try/download/community");
    console.error("   2. Use MongoDB Atlas (free): https://cloud.mongodb.com");
    console.error("      Update MONGO_URI in server/.env with your Atlas connection string");
    process.exit(1);
  }
}

start();
