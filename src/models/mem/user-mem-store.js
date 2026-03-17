/**
 * User Memory Store
 *
 * In-memory data store for users.
 * Used to manage user data without a database
 * during development or testing.
 */
import { v4 } from "uuid";

// In-memory array to hold user data
let users = [];

// Exported object containing methods to interact with the user data
export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  // Add a new user to the in-memory store and assign it a unique ID
  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  // Retrieve a specific user by their unique ID
  async getUserById(id) {
    return users.find((user) => user._id === id) || null;
  },

  // Retrieve a specific user by their email address
  async getUserByEmail(email) {
    return users.find((user) => user.email === email) || null;
  },

  // Delete a specific user by their unique ID from the in-memory store
  async deleteAll() {
    users = [];
  },
};
