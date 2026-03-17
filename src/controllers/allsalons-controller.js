/**
 * All Salons Controller
 *
 * Handles displaying all salons for the logged-in user.
 * Retrieves user-specific salon data from the database.
 */
import { db } from "../models/db.js";

// Controller object containing the handler for displaying all salons
export const allsalonsController = {

  // Handler function to display all salons for the logged-in user
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      // Retrieve all salons associated with the logged-in user from the database
      const salons = await db.salonStore.getUserSalons(loggedInUser._id);

      // Render the view with the retrieved salons and user information
      return h.view("allsalons-view", {
        title: "Dublin Nail Salons", // Set the page title
        user: loggedInUser, // Pass the logged-in user information to the view for personalized content
        salons,
      });
    },
  },
};
