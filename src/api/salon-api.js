import Boom from "@hapi/boom";
import { validationError } from "./logger.js";
import { IdSpec, SalonSpec, SalonSpecPlus, SalonArraySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const salonApi = {
  find: {
    auth: "jwt",
    tags: ["api"],
    description: "Get all salons",
    notes: "Returns all salons",
    response: { schema: SalonArraySpec, failAction: validationError },
    handler: async function () {
      const salons = await db.salonStore.getAllSalons();
      return salons.map((salon) => ({
        _id: salon._id.toString(),
        userid: salon.userid ? salon.userid.toString() : undefined,
        name: salon.name,
        area: salon.area,
        address: salon.address,
        services: salon.services,
        rating: salon.rating,
        notes: salon.notes,
        latitude: salon.latitude,
        longitude: salon.longitude,
        image: salon.image,
      }));
    },
  },

  findOne: {
    auth: "jwt",
    tags: ["api"],
    description: "Find a salon",
    notes: "Returns a salon by id",
    validate: {
      params: { id: IdSpec },
      failAction: validationError,
    },
    response: { schema: SalonSpecPlus.unknown(true), failAction: validationError },
    handler: async function (request) {
      const salon = await db.salonStore.getSalonById(request.params.id);
      if (!salon) {
        return Boom.notFound("No salon with this id");
      }

      return {
        _id: salon._id.toString(),
        userid: salon.userid ? salon.userid.toString() : undefined,
        name: salon.name,
        area: salon.area,
        address: salon.address,
        services: salon.services,
        rating: salon.rating,
        notes: salon.notes,
        latitude: salon.latitude,
        longitude: salon.longitude,
        image: salon.image,
      };
    },
  },

  create: {
    auth: "jwt",
    tags: ["api"],
    description: "Create a salon",
    notes: "Returns the newly created salon",
    validate: {
      payload: SalonSpec,
      failAction: validationError,
    },
   response: { failAction: validationError },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userid = request.payload.userid || loggedInUser._id || loggedInUser.userId;

      const salonData = {
        ...request.payload,
        userid,
      };

      const salon = await db.salonStore.addSalon(salonData);

      return h.response({
        _id: salon._id.toString(),
        userid: salon.userid ? salon.userid.toString() : undefined,
        name: salon.name,
        area: salon.area,
        address: salon.address,
        services: salon.services,
        rating: salon.rating,
        notes: salon.notes,
        latitude: salon.latitude,
        longitude: salon.longitude,
        image: salon.image,
      }).code(201);
    },
  },

  deleteOne: {
    auth: "jwt",
    tags: ["api"],
    description: "Delete a salon",
    notes: "Deletes a salon by id",
    validate: {
      params: { id: IdSpec },
      failAction: validationError,
    },
    handler: async function (request) {
      const salon = await db.salonStore.getSalonById(request.params.id);
      if (!salon) {
        return Boom.notFound("No salon with this id");
      }
      await db.serviceStore.deleteServicesBySalonId(request.params.id);
      await db.salonStore.deleteSalonById(request.params.id);
      return { success: true };
    },
  },

  deleteAll: {
    auth: "jwt",
    tags: ["api"],
    description: "Delete all salons",
    notes: "Removes all salons from the database",
    handler: async function () {
      await db.serviceStore.deleteAllServices();
      await db.salonStore.deleteAllSalons();
      return { success: true };
    },
  },
};