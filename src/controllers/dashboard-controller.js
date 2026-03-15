import { SalonSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

const dublinDemoSalons = [
  {
    name: "Tropical Nails",
    area: "Central Dublin",
    address: "24 Henry St, Dublin 1",
    services: "Gel, Acrylic",
    rating: 4,
    notes: "Friendly staff and central location.",
    latitude: 53.35031,
    longitude: -6.2612,
    categoryTitle: "Acrylic",
  },
  {
    name: "5th Avenue Nails",
    area: "Central Dublin",
    address: "Grafton Street, Dublin 2",
    services: "Manicure, Pedicure",
    rating: 4,
    notes: "Great for quick city centre appointments.",
    latitude: 53.34185,
    longitude: -6.25973,
    categoryTitle: "Manicure",
  },
  {
    name: "Fifth Avenue Nail Boutique",
    area: "South Dublin",
    address: "Dundrum Town Centre, Dublin 16",
    services: "BIAB, Gel",
    rating: 4,
    notes: "Popular BIAB option for south Dublin.",
    latitude: 53.28666,
    longitude: -6.24252,
    categoryTitle: "BIAB",
  },
  {
    name: "Mint Nails",
    area: "South Dublin",
    address: "Rathmines Road Lower, Dublin 6",
    services: "Gel Polish",
    rating: 4,
    notes: "Student-friendly salon with good value.",
    latitude: 53.32269,
    longitude: -6.26556,
    categoryTitle: "Gel Nails",
  },
  {
    name: "Orchid Nails",
    area: "Central Dublin",
    address: "Temple Bar, Dublin 2",
    services: "Nail Art",
    rating: 4,
    notes: "Known for detailed nail art designs.",
    latitude: 53.34545,
    longitude: -6.26472,
    categoryTitle: "Nail Art",
  },
];

async function buildDashboardView(loggedInUser) {
  const salons = await db.salonStore.getUserSalons(loggedInUser._id);
  const categories = await db.categoryStore.getUserCategories(loggedInUser._id);

  return {
    title: "NailSpot Dublin Dashboard",
    user: loggedInUser,
    salons,
    categories,
    salonsJson: JSON.stringify(salons),
  };
}

async function getOrCreateCategory(userid, title) {
  const categories = await db.categoryStore.getUserCategories(userid);
  let category = categories.find((c) => c.title === title);

  if (!category) {
    category = await db.categoryStore.addCategory({
      title,
      userid,
    });
  }

  return category;
}

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const viewData = await buildDashboardView(loggedInUser);
      return h.view("dashboard-view", viewData);
    },
  },

  addSalon: {
    validate: {
      payload: SalonSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const viewData = await buildDashboardView(loggedInUser);
        viewData.errors = error.details;
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      const salonData = {
        name: request.payload.name,
        area: request.payload.area,
        address: request.payload.address,
        services: request.payload.services,
        rating: Number(request.payload.rating || 4),
        notes: request.payload.notes,
        latitude: Number(request.payload.latitude || 53.3498),
        longitude: Number(request.payload.longitude || -6.2603),
        categoryid: request.payload.categoryid,
        userid: loggedInUser._id,
      };

      await db.salonStore.addSalon(salonData);
      return h.redirect("/dashboard");
    },
  },

  loadDemoData: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const existingSalons = await db.salonStore.getUserSalons(loggedInUser._id);

      for (const salon of dublinDemoSalons) {
        const alreadyExists = existingSalons.find(
          (existingSalon) => existingSalon.name === salon.name
        );

        if (!alreadyExists) {
          // eslint-disable-next-line no-await-in-loop
          const category = await getOrCreateCategory(loggedInUser._id, salon.categoryTitle);

          const salonData = {
            name: salon.name,
            area: salon.area,
            address: salon.address,
            services: salon.services,
            rating: salon.rating,
            notes: salon.notes,
            latitude: salon.latitude,
            longitude: salon.longitude,
            categoryid: category._id,
            userid: loggedInUser._id,
          };

          // eslint-disable-next-line no-await-in-loop
          await db.salonStore.addSalon(salonData);
        }
      }

      return h.redirect("/salons");
    },
  },

  deleteSalon: {
    handler: async function (request, h) {
      await db.serviceStore.deleteServicesBySalonId(request.params.id);
      await db.salonStore.deleteSalonById(request.params.id);
      return h.redirect("/dashboard");
    },
  },
};