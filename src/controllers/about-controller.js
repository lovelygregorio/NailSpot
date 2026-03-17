/**
 * About Controller
 *
 * Handles rendering of the About page.
 * Displays information about the NailSpot Dublin application.
 */

export const aboutController = {
  index: {
    handler: function (request, h) {
      return h.view("about-view", { title: "About NailSpot Dublin" });
    },
  },
};
