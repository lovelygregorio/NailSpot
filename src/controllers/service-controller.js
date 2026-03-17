/**
 * Service Controller
 *
 * Handles service-related views and updates.
 * Allows editing and updating services linked to a salon.
 */
import { ServiceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

// Controller object containing handlers for service-related operations
export const serviceController = {

  // Handler function to display the edit service view for a specific service
  index: {
    handler: async function (request, h) {
      const salon = await db.salonStore.getSalonById(request.params.id);
      const service = await db.serviceStore.getServiceById(request.params.serviceid);
     
     // Redirect if salon or service does not exist
      return h.view("service-view", { title: "Edit Service", salon, service });
    },
  },


  // Handler function to update the details of a specific service
  updateService: {
    validate: { 
      payload: ServiceSpec,
      options: { abortEarly: false },

      // If validation fails, re-render the edit service view with error messages
      failAction: async function (request, h, error) {
        const salon = await db.salonStore.getSalonById(request.params.id);
        const service = await db.serviceStore.getServiceById(request.params.serviceid);
        return h.view("service-view", { title: "Edit Service", salon, service, errors: error.details }).takeover().code(400);
      },
    },

    // Handler function to process the edit service form submission and update the service details
    handler: async function (request, h) {
      
      // Retrieve the logged-in user and the service to be updated from the database
      const service = await db.serviceStore.getServiceById(request.params.serviceid);

      // Redirect if service does not exist 
      await db.serviceStore.updateService(service, request.payload);

      // After updating the service, redirect back to the salon view to see the updated service details
      return h.redirect(`/salon/${request.params.id}`); //
    },
  },
};
