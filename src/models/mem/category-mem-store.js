/**
 * Category Memory Store
 *
 * In-memory data store for categories.
 * Used to manage category data without a database (mainly for testing or development).
 */

import { v4 } from "uuid";

// In-memory array to hold category data
let categories = [];

// Exported object containing methods to interact with the category data
export const categoryMemStore = {
  async getAllCategories() { // Retrieve all categories from the in-memory store
    return categories; // Return the entire array of categories
  },

  // Retrieve categories for a specific user based on their user ID
  async getUserCategories(userid) { 
    return categories.filter((category) => category.userid === userid);
  },


  // Add a new category to the in-memory store and assign it a unique ID
  async addCategory(category) {
    category._id = v4(); // Generate a unique ID for the new category
    categories.push(category); // Add the new category to the array
    return category; // Return the newly added category with its assigned ID
  },

  // Retrieve a specific category by its unique ID
  async getCategoryById(id) {

    // Find and return the category that matches the provided ID, or return undefined if not found
    return categories.find((category) => category._id === id);
  },

  // Delete a specific category by its unique ID from the in-memory store
  async deleteCategoryById(id) {

    // Find the index of the category that matches the provided ID and remove it from the array if found
    const index = categories.findIndex((category) => category._id === id);
    if (index !== -1) categories.splice(index, 1); //
  },

  // Delete all categories from the in-memory store (used for testing or resetting data)
  async deleteAllCategories() {  // Clear the entire array of categories, effectively deleting all category data
    categories = []; // Clear the entire array of categories
  },
};