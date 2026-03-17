/**
 * Salon Model
 *
 * Defines the schema for Salon documents in MongoDB.
 * Each salon belongs to a user and can be linked to a category.
 */

import Mongoose from "mongoose";

// Define the schema for the Salon collection in MongoDB
const { Schema } = Mongoose;

// Schema for the Salon model, including details about the salon and references to category and user
const salonSchema = new Schema({
  name: String,
  area: String,
  address: String,
  services: String,
  rating: Number,
  notes: String,
  latitude: Number,
  longitude: Number,
  image: String,

  // Reference to the category that the salon belongs to (optional)
  categoryid: { 
    type: Schema.Types.ObjectId, 
    ref: "Category", 
    required: false, // Category is optional, allowing salons to exist without being assigned to a category
  },

  // Reference to the user who owns the salon (required for associating salons with specific users)
  userid: { 
    type: Schema.Types.ObjectId, // Reference to the user who owns the salon
    ref: "User", 
  },
});

// Create and export the Salon model based on the defined schema
export const Salon = Mongoose.model("Salon", salonSchema);
