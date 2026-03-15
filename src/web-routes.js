import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { salonController } from "./controllers/salon-controller.js";
import { serviceController } from "./controllers/service-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/account", config: accountsController.showAccount },
  { method: "POST", path: "/account/update", config: accountsController.updateAccount },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addsalon", config: dashboardController.addSalon },
  { method: "GET", path: "/dashboard/deletesalon/{id}", config: dashboardController.deleteSalon },

  { method: "GET", path: "/salon/{id}", config: salonController.index },
  { method: "POST", path: "/salon/{id}/addservice", config: salonController.addService },
  { method: "GET", path: "/salon/{id}/deleteservice/{serviceid}", config: salonController.deleteService },

  { method: "GET", path: "/service/{id}/editservice/{serviceid}", config: serviceController.index },
  { method: "POST", path: "/service/{id}/updateservice/{serviceid}", config: serviceController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
