/**
 * Category Controller
 *
 * Handles category-related views and operations.
 * Allows users to view, add, and delete categories,
 * and displays salons grouped by category.
 */
import { db } from "../models/db.js";

// Controller object containing handlers for category-related operations
export const categoryController = {

  // Handler function to display all categories and their associated salon counts
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      //  Get user categories and salons from the database
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const salons = await db.salonStore.getUserSalons(loggedInUser._id);

      //
      const categoriesWithCounts = categories.map((category) => {
        const salonCount = salons.filter(
          (salon) => salon.categoryid?.toString() === category._id.toString()
        ).length;

        return {
          ...category,
          salonCount,
        };
      });

      return h.view("categories-view", {
        title: "Nail Categories",
        categories: categoriesWithCounts,
      });
    },
  },

  // Handler function to display salons for a specific category
  show: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);

      // Ensure category exists and belongs to the logged-in user
      if (!category || category.userid?.toString() !== loggedInUser._id.toString()) {
        return h.redirect("/categories");
      }

      const salons = await db.salonStore.getSalonsByCategoryId(category._id);

      return h.view("category-view", {
        title: category.title,
        category,
        salons,
      });
    },
  },

  // Handler function to add a new category for the logged-in user
  addCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      // Check for duplicate category titles for the user
      const existingCategories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const duplicate = existingCategories.find(
        (category) => category.title.toLowerCase() === request.payload.title.toLowerCase()
      );

      // If no duplicate is found, create a new category and add it to the database
      if (!duplicate) {
        const newCategory = {
          title: request.payload.title,
          userid: loggedInUser._id,
        };

        await db.categoryStore.addCategory(newCategory);
      }

      return h.redirect("/categories");
    },
  },

  // Handler function to delete a category if it belongs to the logged-in user
  deleteCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);

      // If the category exists and belongs to the logged-in user, delete it from the database
      if (category && category.userid?.toString() === loggedInUser._id.toString()) {
        await db.categoryStore.deleteCategoryById(category._id);
      }

      return h.redirect("/categories");
    },
  },
};
