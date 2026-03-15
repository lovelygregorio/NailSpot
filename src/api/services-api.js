import Boom from "@hapi/boom";
import { validationError } from "./logger.js";
import { IdSpec, ServiceSpec, ServiceSpecPlus, ServiceArraySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const serviceApi = {
  find: {
    auth: "jwt",
    tags: ["api"],
    description: "Get all services",
    notes: "Returns all services",
    response: { schema: ServiceArraySpec, failAction: validationError },
    handler: async function () {
      const services = await db.serviceStore.getAllServices();
      return services.map((service) => ({
        _id: service._id.toString(),
        salonid: service.salonid ? service.salonid.toString() : undefined,
        title: service.title,
        category: service.category,
        price: service.price,
      }));
    },
  },

  findOne: {
    auth: "jwt",
    tags: ["api"],
    description: "Find a service",
    notes: "Returns a service by id",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ServiceSpecPlus.unknown(true), failAction: validationError },
    handler: async function (request) {
      const service = await db.serviceStore.getServiceById(request.params.id);
      if (!service) return Boom.notFound("No service with this id");

      return {
        _id: service._id.toString(),
        salonid: service.salonid ? service.salonid.toString() : undefined,
        title: service.title,
        category: service.category,
        price: service.price,
      };
    },
  },

  create: {
    auth: "jwt",
    tags: ["api"],
    description: "Create a service",
    notes: "Adds a service to a salon",
    validate: {
      params: { id: IdSpec },
      payload: ServiceSpec,
      failAction: validationError,
    },
    response: { schema: ServiceSpecPlus.unknown(true), failAction: validationError },
    handler: async function (request, h) {
      const salon = await db.salonStore.getSalonById(request.params.id);
      if (!salon) return Boom.notFound("No salon with this id");

      const serviceData = {
        ...request.payload,
        salonid: request.params.id,
      };

      const service = await db.serviceStore.addService(request.params.id, serviceData);

      return h.response({
        _id: service._id.toString(),
        salonid: service.salonid ? service.salonid.toString() : request.params.id,
        title: service.title,
        category: service.category,
        price: service.price,
      }).code(201);
    },
  },

  deleteOne: {
    auth: "jwt",
    tags: ["api"],
    description: "Delete a service",
    notes: "Deletes a service by id",
    validate: { params: { id: IdSpec }, failAction: validationError },
    handler: async function (request) {
      const service = await db.serviceStore.getServiceById(request.params.id);
      if (!service) return Boom.notFound("No service with this id");
      await db.serviceStore.deleteService(request.params.id);
      return { success: true };
    },
  },

  deleteAll: {
    auth: "jwt",
    tags: ["api"],
    description: "Delete all services",
    notes: "Removes all services from the database",
    handler: async function () {
      await db.serviceStore.deleteAllServices();
      return { success: true };
    },
  },
};