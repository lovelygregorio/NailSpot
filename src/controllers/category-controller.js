import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const salons = await db.salonStore.getUserSalons(loggedInUser._id);

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

  show: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);

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

  addCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const existingCategories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const duplicate = existingCategories.find(
        (category) => category.title.toLowerCase() === request.payload.title.toLowerCase()
      );

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

  deleteCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);

      if (category && category.userid?.toString() === loggedInUser._id.toString()) {
        await db.categoryStore.deleteCategoryById(category._id);
      }

      return h.redirect("/categories");
    },
  },
};
