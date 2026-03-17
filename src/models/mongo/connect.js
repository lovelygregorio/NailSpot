/**
 * MongoDB Connection
 *
 * Connects the application to MongoDB using Mongoose.
 * Loads the connection string from environment variables.
 */

import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env file for MongoDB connection string
dotenv.config();

// Connect to MongoDB using the connection string from environment variables
export async function connectMongo() {

  // Retrieve the MongoDB connection string from environment variables, with a fallback to a default value
  const mongoUrl = process.env.MONGO_URL || process.env.db; // Fallback to 'db' for backward compatibility with older .env files
 
 // If the MongoDB connection string is not provided, throw an error to alert the developer
  if (!mongoUrl) {
    throw new Error("MongoDB connection string is missing. Set MONGO_URL or db in .env");
  }

  // Attempt to connect to MongoDB using Mongoose with the provided connection string
  await mongoose.connect(mongoUrl); 

  // Log a message to the console indicating that the database connection was successful
  console.log("database connected to nailspot on 127.0.0.1"); 
}

