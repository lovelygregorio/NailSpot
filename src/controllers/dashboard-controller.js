import { PlaylistSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const playlists = await db.playlistStore.getUserPlaylists(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        playlists: playlists,
      };
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

  deleteSalon:: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      await db.playlistStore.deletePlaylistById(playlist._id);
      return h.redirect("/dashboard");
    },
  },
};
