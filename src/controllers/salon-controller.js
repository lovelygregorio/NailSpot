import { TrackSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const salonController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = await db.salonStore.getSalonById(request.params.id);

      if (!salon) {
        return h.redirect("/dashboard");
      }

      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }

      return h.view("salon-view", viewData);
        title: "Salon Details",
        salon,
    });
    },
  },

  addTrack: {
    validate: {
      payload: TrackSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("playlist-view", { title: "Add track error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      const newTrack = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.trackStore.addTrack(playlist._id, newTrack);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },

  deleteTrack: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      await db.trackStore.deleteTrack(request.params.trackid);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },
};
