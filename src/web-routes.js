import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { salonController } from "./controllers/salon-controller.js";
import { allsalonsController } from "./controllers/allsalons-controller.js";
import { serviceController } from "./controllers/service-controller.js";
import { categoryController } from "./controllers/category-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/account", config: accountsController.showAccount },
  { method: "POST", path: "/account/update", config: accountsController.updateAccount },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addsalon", config: dashboardController.addSalon },
  { method: "GET", path: "/dashboard/load-demo", config: dashboardController.loadDemoData },
  { method: "GET", path: "/dashboard/deletesalon/{id}", config: dashboardController.deleteSalon },

  { method: "GET", path: "/categories", config: categoryController.index },
  { method: "POST", path: "/categories/add", config: categoryController.addCategory },
  { method: "GET", path: "/categories/delete/{id}", config: categoryController.deleteCategory },
  { method: "GET", path: "/categories/{id}", config: categoryController.show },
  { method: "POST", path: "/categories/{id}/addsalon", config: salonController.addSalon },

  { method: "GET", path: "/salons", config: allsalonsController.index },
  { method: "GET", path: "/salon/{id}", config: salonController.index },
  { method: "POST", path: "/salon/{id}/updatesalon", config: salonController.updateSalon },
  { method: "POST", path: "/salon/{id}/addservice", config: salonController.addService },
  { method: "GET", path: "/salon/{id}/deleteservice/{serviceid}", config: salonController.deleteService },

  { method: "GET", path: "/service/{id}/edit/{serviceid}", config: serviceController.index },
  { method: "POST", path: "/service/{id}/update/{serviceid}", config: serviceController.updateService },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: { path: "./public" },
    },
    options: { auth: false },
  },
];