import { userApi } from "./api/user-api.js";
import { salonApi } from "./api/salon-api.js";
import { serviceApi } from "./api/service-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/salons", config: salonApi.find },
  { method: "GET", path: "/api/salons/{id}", config: salonApi.findOne },
  { method: "POST", path: "/api/salons", config: salonApi.create },
  { method: "DELETE", path: "/api/salons", config: salonApi.deleteAll },
  { method: "DELETE", path: "/api/salons/{id}", config: salonApi.deleteOne },

  { method: "GET", path: "/api/services", config: serviceApi.find },
  { method: "GET", path: "/api/services/{id}", config: serviceApi.findOne },
  { method: "POST", path: "/api/salons/{id}/services", config: serviceApi.create },
  { method: "DELETE", path: "/api/services", config: serviceApi.deleteAll },
  { method: "DELETE", path: "/api/services/{id}", config: serviceApi.deleteOne },
];
