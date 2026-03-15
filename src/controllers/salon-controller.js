import { db } from "../models/db.js";

export const salonController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = await db.salonStore.getSalonById(request.params.id);
      const salon = await db.salonStore.getSalonById(request.params.id);

      if (!salon) {
        return h.redirect("/dashboard");
      }

      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }

      return h.view("salon-view", {
        title: "Salon Details",
        salon,
    });
    },
  },

  addSalon: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);

       if (!category) {
        return h.redirect("/categories");
      }

      if (String(category.userid) !== String(loggedInUser._id)) {
        return h.redirect("/categories");
      }

      const newSalon = {
        name: request.payload.name,
        area: request.payload.area,
        address: request.payload.address,
        services: request.payload.services,
        rating: Number(request.payload.rating || 4),
        notes: request.payload.notes,
        latitude: Number(request.payload.latitude || 53.3498),
        longitude: Number(request.payload.longitude || -6.2603),
        categoryid: category._id,
        userid: loggedInUser._id,
      
      };
      await db.salonStore.updateSalon(salon, updatedSalon);
      return h.redirect(`/salon/${request.params.id}`);
    },
  },

 updateSalon: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const salon = await db.salonStore.getSalonById(request.params.id);

      if (!salon) {
        return h.redirect("/dashboard");
      }

      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }

      const updatedSalon = {
        name: request.payload.name,
        area: request.payload.area,
        address: request.payload.address,
        services: request.payload.services,
        rating: Number(request.payload.rating || 4),
        notes: request.payload.notes,
        latitude: Number(request.payload.latitude || 53.3498),
        longitude: Number(request.payload.longitude || -6.2603),
        categoryid: salon.categoryid,
        userid: salon.userid,
      };

      await db.salonStore.updateSalon(salon, updatedSalon);
      return h.redirect(`/salon/${request.params.id}`);
    },
  },

  addService: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const salon = await db.salonStore.getSalonById(request.params.id);

      if (!salon) {
        return h.redirect("/dashboard");
      }

      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }

      const newService = {
        salonid: salon._id,
        title: request.payload.title,
        category: request.payload.category,
        price: Number(request.payload.price),
      };

      await db.serviceStore.addService(newService);
      return h.redirect(`/salon/${request.params.id}`);
    },
  },

  deleteService: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const salon = await db.salonStore.getSalonById(request.params.id);

      if (!salon) {
        return h.redirect("/dashboard");
      }

      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }

      await db.serviceStore.deleteServiceById(request.params.serviceid);
      return h.redirect(`/salon/${request.params.id}`);
    },
  },
};
