/**
 * User API Controller
 *
 * Handles all API endpoints related to users.
 * Includes user management and authentication.
 * Uses Joi validation and JWT for secure access.
 */

import Boom from "@hapi/boom";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";
import {
  IdSpec,
  UserSpec,
  UserCredentialsSpec,
  UserArraySpec,
  UserSpecPlus,
} from "../models/joi-schemas.js";
import { db } from "../models/db.js";


export const userApi = {

  // Get all users
  find: {
    auth: false,
    tags: ["api"],
    description: "Get all users",
    notes: "Returns all users",
    response: { schema: UserArraySpec, failAction: validationError },


    handler: async function () {
      const users = await db.userStore.getAllUsers();

      // Convert MongoDB ObjectIds to strings for API response
      return users.map((user) => ({
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin ?? false,
      }));
    },
  },

  // Get a single user by ID
  findOne: {
    auth: false,
    tags: ["api"],
    description: "Find a user",
    notes: "Returns a user by id",

    validate: {
      params: { id: IdSpec },
      failAction: validationError,
    },

    response: { schema: UserSpecPlus.unknown(true), failAction: validationError },
    
    handler: async function (request) {
      const user = await db.userStore.getUserById(request.params.id);

      // If no user is found with the given ID, return a 404 Not Found error
      if (!user) {
        return Boom.notFound("No user with this id");
      }

        
      return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin ?? false,
      };
    },
  },

  // Create a new user
  create: {
    auth: false,
    tags: ["api"],
    description: "Create a user",
    notes: "Returns the newly created user",

    validate: {
      payload: UserSpec,
      failAction: validationError,
    },

    response: { schema: UserSpecPlus.unknown(true), failAction: validationError },
    
    handler: async function (request, h) {
      const existingUser = await db.userStore.getUserByEmail(request.payload.email);
     
      if (existingUser) {
        return Boom.badRequest("Email already exists");
      }

      const user = await db.userStore.addUser(request.payload);

      return h.response({
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin ?? false,
      }).code(201);
    },
  },

  // Authenticate a user and return a JWT token
  authenticate: {
    auth: false,
    tags: ["api"],
    description: "Authenticate a user",
    notes: "Returns a JWT token",

    validate: {
      payload: UserCredentialsSpec,
      failAction: validationError,
    },

    handler: async function (request, h) {
      const user = await db.userStore.getUserByEmail(request.payload.email);
    
    // If no user is found with the given email or if the password does not match, return a 401 Unauthorized error
      if (!user || user.password !== request.payload.password) {
        return Boom.unauthorized("Invalid email or password");
      }

      return h.response({
        success: true,
        token: createToken(user),
        _id: user._id.toString(),
      }).code(201);
    },
  },

  // Delete a single user by ID
  deleteAll: {
    auth: "jwt",
    tags: ["api"],
    description: "Delete all users",
    notes: "Removes all users from the database",

    // First delete all salons and services to avoid orphaned records, then delete all users
    handler: async function () {
      await db.userStore.deleteAll();
      return { success: true }; // Return a success response after deletion
    },
  },
};