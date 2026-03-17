/**
 * Salon Service (API Helper)
 *
 * This file handles all API requests using Axios.
 * It is mainly used for testing and interacting with the backend API.
 * Includes user authentication, salon management, and service operations.
 */

import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const salonService = {
  // Base URL for the API endpoints (from fixtures for flexibility)
  salonUrl: serviceUrl,

  // user functions
  async createUser(user) { // Create a new user by sending a POST request to the API with the user data
    try {
      const response = await axios.post(`${this.salonUrl}/api/users`, user);
      return response.data;
    } catch (error) {
      console.log("CREATE USER STATUS:", error.response?.status);
      console.log("CREATE USER DATA:", error.response?.data);
      throw error;
    }
  },

  // Get all users
    async getAllUsers() {
    const response = await axios.get(`${this.salonUrl}/api/users`);
    return response.data;
  },

  // Get a single user by ID
  async getUser(id) {
    const response = await axios.get(`${this.salonUrl}/api/users/${id}`);
    return response.data;
  },

  // Delete a users used for testing/resetting data
  async deleteAllUsers() {
    const response = await axios.delete(`${this.salonUrl}/api/users`);
    return response.data;
  },

  // Authenticate user and store JWT token for future requests
  async authenticate(user) {
    const response = await axios.post(`${this.salonUrl}/api/users/authenticate`, {
      email: user.email,
      password: user.password,
    });

    // Store the JWT token in Axios default headers for authenticated requests
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  // Clear the stored JWT token from Axios default headers (used for logging out or resetting authentication)
  clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  // salon functions
  async createSalon(salon) {
    const response = await axios.post(`${this.salonUrl}/api/salons`, salon);
    return response.data;
  },

  // Get all salons
  async getAllSalons() {
    const response = await axios.get(`${this.salonUrl}/api/salons`);
    return response.data;
  },

  // Get a single salon by ID
  async getSalon(id) {
    const response = await axios.get(`${this.salonUrl}/api/salons/${id}`);
    return response.data;
  },

  // Delete a single salon by ID
  async deleteSalon(id) {
    const response = await axios.delete(`${this.salonUrl}/api/salons/${id}`);
    return response.data;
  },

  // Delete all salons used for testing/resetting data
  async deleteAllSalons() {
    const response = await axios.delete(`${this.salonUrl}/api/salons`);
    return response.data;
  },

  // service functions
  async createService(salonId, service) {
    const response = await axios.post(`${this.salonUrl}/api/salons/${salonId}/services`, service);
    return response.data;
  },

  // Get all services
  async getAllServices() {
    const response = await axios.get(`${this.salonUrl}/api/services`);
    return response.data;
  },

  // Get a single service by ID
  async getService(id) {
    const response = await axios.get(`${this.salonUrl}/api/services/${id}`);
    return response.data;
  },

  // Delete a single service by ID
  async deleteService(id) {
    const response = await axios.delete(`${this.salonUrl}/api/services/${id}`);
    return response.data;
  },

  // Delete all services used for testing/resetting data
  async deleteAllServices() {
    const response = await axios.delete(`${this.salonUrl}/api/services`);
    return response.data;
  },
};