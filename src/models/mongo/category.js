/**
 * Category Model
 *
 * Defines the schema for Category documents in MongoDB.
 * Each category belongs to a user and contains a title.
 */
import Mongoose from "mongoose";

// Define the schema for the Category collection in MongoDB
const { Schema } = Mongoose;

// Schema for the Category model, including title and reference to the user who owns the category
const categorySchema = new Schema({

  // Title of the category
  title: String,
  userid: {
    type: Schema.Types.ObjectId, // Reference to the user who owns the category
    ref: "User", // Reference to the User model for relational integrity
  },
});

// Create and export the Category model based on the defined schema
export const Category = Mongoose.model("Category", categorySchema);