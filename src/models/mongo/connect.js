import dotenv from "dotenv";
import mongoose from "mongoose";

  dotenv.config();

export async function connectMongo() {
  const mongoUrl = process.env.MONGO_URL || process.env.db;
  if (!mongoUrl) {
    throw new Error("MongoDB connection string is missing. Set MONGO_URL or db in .env");
  }
  await mongoose.connect(mongoUrl);
  console.log("database connected to nailspot on 127.0.0.1");
}

