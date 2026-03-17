/**
 * Service Model
 *
 * Defines the schema for Service documents in MongoDB.
 * Each service is linked to a salon and contains details
 * such as title, category, and price.
 */

import Mongoose from "mongoose";

// service schema
const { Schema } = Mongoose;

// reference to the salon this service belongs to
const serviceSchema = new Schema({
  // Reference to the salon that this service belongs to, establishing a relationship between services and salons in the MongoDB collection
  salonid: {
    type: Schema.Types.ObjectId,
    ref: "Salon",
  },

  // Details about the service, including title, category, and price
  title: String,
  category: String,
  price: Number,
});

// Create and export the Service model based on the defined schema
export const Service = Mongoose.model("Service", serviceSchema);
