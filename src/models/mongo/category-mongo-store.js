import { Category } from "./category.js";

export const categoryMongoStore = {
  async getAllCategories() {
    return await Category.find().lean();
  },

  async getUserCategories(userid) {
    return await Category.find({ userid }).lean();
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getCategoryById(id) {
    if (id) {
      return await Category.findOne({ _id: id }).lean();
    }
    return null;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("Invalid Category ID");
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  },
};