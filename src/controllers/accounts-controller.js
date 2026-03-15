import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to NailSpot Dublin" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Create your NailSpot account" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    ,
    handler: async function (request, h) {
      const existingUser = await db.userStore.getUserByEmail(request.payload.email);
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Create your NailSpot account" });
    },
  },
















 login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", {
          title: "Login error",
          errors: error.details,
        }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserByEmail(request.payload.email);

      if (!user || user.password !== request.payload.password) {
        return h.view("login-view", {
          title: "Login failed",
          errors: [{ message: "Invalid email or password" }],
        }).takeover().code(401);
      }

      request.cookieAuth.set({
        _id: user._id.toString(),
        email: user.email,
      });

      return h.redirect("/dashboard");
    },
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  showAccount: {
    handler: async function (request, h) {
      const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);

      if (!loggedInUser) {
        request.cookieAuth.clear();
        return h.redirect("/login");
      }

      return h.view("account-view", {
        title: "Account Settings",
        user: loggedInUser,
      });
    },
  },





  
validate: {
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
