/**
 * API Routes Configuration
 *
 * Defines all REST API endpoints for users, salons, and services.
 * Connects HTTP routes to their corresponding controller handlers.
 */

import { userApi } from "./api/user-api.js";
import { salonApi } from "./api/salon-api.js";
import { serviceApi } from "./api/service-api.js";

// API route definitions connecting HTTP methods and paths to controller configurations
export const apiRoutes = [

  // User API endpoints
  // Get all users, get a user by ID, create a new user, delete all users, authenticate a user
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  // Salon API endpoints
  { method: "GET", path: "/api/salons", config: salonApi.find },
  { method: "GET", path: "/api/salons/{id}", config: salonApi.findOne },
  { method: "POST", path: "/api/salons", config: salonApi.create },
  { method: "DELETE", path: "/api/salons", config: salonApi.deleteAll },
  { method: "DELETE", path: "/api/salons/{id}", config: salonApi.deleteOne },

  // Service API endpoints
  { method: "GET", path: "/api/services", config: serviceApi.find },
  { method: "GET", path: "/api/services/{id}", config: serviceApi.findOne },
  { method: "POST", path: "/api/salons/{id}/services", config: serviceApi.create },
  { method: "DELETE", path: "/api/services", config: serviceApi.deleteAll },
  { method: "DELETE", path: "/api/services/{id}", config: serviceApi.deleteOne },
];
