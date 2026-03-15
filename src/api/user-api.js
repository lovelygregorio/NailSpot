import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserSpec, UserSpecPlus, IdSpec, UserArray, UserCredentialsSpec, } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

export const userApi = {
  find: {
    auth: false,
    tags: ["api"],
    description: "Get all users",
    notes: "Returns all users",
    response: { schema: UserArray, failAction: validationError },
     handler: async function () {
      const users = await db.userStore.getAllUsers();
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

  
  findOne: {
    auth: false,
    tags: ["api"],
    description: "Find a user",
    notes: "Returns a user by id",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
    handler: async function (request) {
      const user = await db.userStore.getUserById(request.params.id);
      if (!user) return Boom.notFound("No user with this id");
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
  
  create: {
    auth: false,
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },
    handler: async function (request, h) {
      const existingUser = await db.userStore.getUserByEmail(request.payload.email);
      if (existingUser) {
        return Boom.badRequest("Email already exists");
      }
       const user = await db.userStore.addUser(request.payload);
    },
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

  authenticate: {
    auth: false,
    tags: ["api"],
    description: "Authenticate a user",
    notes: "Returns a JWT token if authentication is successful",
    validate: { payload: UserCredentialsSpec, failAction: validationError 
  },
    handler: async function (request, h) {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid email or password");
        }
     
        return h.response({ success: true, toke: createToken(user), 
          _id: user._id.toString(),
      }).code(201);
  },
};

 deleteAll: {
    auth: "jwt",
    tags: ["api"],
    description: "Delete all users",
    notes: "Removes all users from the database",
    handler: async function () {
      await db.userStore.deleteAll();
      return { success: true };
    },
  },
};