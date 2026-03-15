import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const salonService = {
  salonUrl: serviceUrl,

  async createUser(user) {
    try {
      const response = await axios.post(`${this.salonUrl}/api/users`, user);
      return response.data;
    } catch (error) {
      console.log("CREATE USER STATUS:", error.response?.status);
      console.log("CREATE USER DATA:", error.response?.data);
      throw error;
    }
  },

  async getAllUsers() {
    const response = await axios.get(`${this.salonUrl}/api/users`);
    return response.data;
  },

  async getUser(id) {
    const response = await axios.get(`${this.salonUrl}/api/users/${id}`);
    return response.data;
  },

  async deleteAllUsers() {
    const response = await axios.delete(`${this.salonUrl}/api/users`);
    return response.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.salonUrl}/api/users/authenticate`, {
      email: user.email,
      password: user.password,
    });
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async createSalon(salon) {
    const response = await axios.post(`${this.salonUrl}/api/salons`, salon);
    return response.data;
  },

  async getAllSalons() {
    const response = await axios.get(`${this.salonUrl}/api/salons`);
    return response.data;
  },

  async getSalon(id) {
    const response = await axios.get(`${this.salonUrl}/api/salons/${id}`);
    return response.data;
  },

  async deleteSalon(id) {
    const response = await axios.delete(`${this.salonUrl}/api/salons/${id}`);
    return response.data;
  },

  async deleteAllSalons() {
    const response = await axios.delete(`${this.salonUrl}/api/salons`);
    return response.data;
  },

  async createService(salonId, service) {
    const response = await axios.post(`${this.salonUrl}/api/salons/${salonId}/services`, service);
    return response.data;
  },

  async getAllServices() {
    const response = await axios.get(`${this.salonUrl}/api/services`);
    return response.data;
  },

  async getService(id) {
    const response = await axios.get(`${this.salonUrl}/api/services/${id}`);
    return response.data;
  },

  async deleteService(id) {
    const response = await axios.delete(`${this.salonUrl}/api/services/${id}`);
    return response.data;
  },

  async deleteAllServices() {
    const response = await axios.delete(`${this.salonUrl}/api/services`);
    return response.data;
  },
};