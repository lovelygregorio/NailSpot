import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    return await User.find().lean();

  },
   async addUser(user) {
    const newUser = new User(user);
    return await newUser.save();
  },

  async getUserById(id) {
    if (!id) return null;
    try {
      return await User.findOne({ _id: id }).lean();
    } catch {
    return null;
    }
  },


  async getUserByEmail(email) {
     if (!email) return null;
    return await User.findOne({ email }).lean();
  },

    async updateUser(id, updatedUser) {
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        user.firstName = updatedUser.firstName;
        user.lastName = updatedUser.lastName;
        user.email = updatedUser.email;
        user.password = updatedUser.password;
        await user.save();
      }
    } catch (error) {
      console.log("bad user id");
    }
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad user id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  }
};
