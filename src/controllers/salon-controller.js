import { TrackSpec } from "../models/joi-schemas.js";
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
      await db.trackStore.deleteTrack(request.params.trackid);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },
};
