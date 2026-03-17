/**
 * Service API Controller
 *
 * Handles all API endpoints related to salon services.
 * Includes functionality to retrieve, create, and delete services.
 * Uses JWT authentication and Joi validation for security and data integrity.
 */

import Boom from "@hapi/boom";
import { validationError } from "./logger.js";
import { IdSpec, ServiceSpec, ServiceSpecPlus, ServiceArraySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const serviceApi = {

// Get all services 
  find: {
    auth: "jwt", // Require JWT authentication for this endpoint
    tags: ["api"],  // API documentation tag
    description: "Get all services",
    notes: "Returns all services",
    response: { schema: ServiceArraySpec, failAction: validationError }, // Validate response against Joi schema

    handler: async function () { // Handler function to process the request
      const services = await db.serviceStore.getAllServices();
      
      // Convert MongoDB ObjectIds to strings for API response
      return services.map((service) => ({
        _id: service._id.toString(),
        salonid: service.salonid ? service.salonid.toString() : undefined,
        title: service.title,
        category: service.category,
        price: service.price,
      }));
    },
  },


  // Get a single service by ID
  findOne: {
    auth: "jwt",
    tags: ["api"],
    description: "Find a service",
    notes: "Returns a service by id",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ServiceSpecPlus.unknown(true), failAction: validationError },

    handler: async function (request) {
      const service = await db.serviceStore.getServiceById(request.params.id);
    
      // If no service is found with the given ID, return a 404 Not Found error
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

  // Create a new service for a specific salon
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
    
      // If no salon is found with the given ID, return a 404 Not Found error
      if (!salon) return Boom.notFound("No salon with this id");

      // Attach the salon ID to the new service data and create the service
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

  // Delete a single service by ID
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

  // Delete all services
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