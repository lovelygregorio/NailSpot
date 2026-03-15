import { ServiceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const serviceController = {
  index: {
    handler: async function (request, h) {
      const salon = await db.salonStore.getSalonById(request.params.id);
      const service = await db.serviceStore.getServiceById(request.params.serviceid);
      return h.view("service-view", { title: "Edit Service", salon, service });
    },
  },

  updateService: {
    validate: {
      payload: ServiceSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const salon = await db.salonStore.getSalonById(request.params.id);
        const service = await db.serviceStore.getServiceById(request.params.serviceid);
        return h.view("service-view", { title: "Edit Service", salon, service, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const service = await db.serviceStore.getServiceById(request.params.serviceid);
      await db.serviceStore.updateService(service, request.payload);
      return h.redirect(`/salon/${request.params.id}`);
    },
  },
};
