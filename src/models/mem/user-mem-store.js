import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    return users.find((user) => user._id === id) || null;
  },

  async getUserByEmail(email) {
    return users.find((user) => user.email === email) || null;
  },

  async deleteAll() {
    users = [];
  },
};
