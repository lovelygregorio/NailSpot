import { db } from "../models/db.js";

export const allsalonsController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const salons = await db.salonStore.getUserSalons(loggedInUser._id);

      return h.view("allsalons-view", {
        title: "Dublin Nail Salons",
        user: loggedInUser,
        salons,
      });
    },
  },
};
