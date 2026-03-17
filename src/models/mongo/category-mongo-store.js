/**
 * Category Mongo Store
 *
 * MongoDB data store for categories using Mongoose.
 * Handles CRUD operations for category data in the database.
 */

import { Category } from "./category.js";

// Exported object containing methods to interact with the category data in MongoDB
export const categoryMongoStore = {

  // Retrieve all categories from the MongoDB collection
  async getAllCategories() {
    return await Category.find().lean();
  },

  // Retrieve categories for a specific user based on their user ID from the MongoDB collection
  async getUserCategories(userid) {
    return await Category.find({ userid }).lean();
  },

  // 
  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  // Retrieve a specific category by its unique ID from the MongoDB collection
  async getCategoryById(id) {
    if (id) {
      return await Category.findOne({ _id: id }).lean();
    }
    return null;
  },

  // Delete a specific category by its unique ID from the MongoDB collection
  async deleteCategoryById(id) {
  
    // Attempt to delete the category with the specified ID from the MongoDB collection
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("Invalid Category ID");
    }
  },

  // Delete all categories from the MongoDB collection (used for testing or resetting data)
  async deleteAllCategories() {
    await Category.deleteMany({});
  },
};