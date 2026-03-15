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
  handler: async function (request, h) {
      const existingUser = await db.userStore.getUserByEmail(request.payload.email);
  
      if (existingUser) {
        return h.view("signup-view", {
          title: "Sign up error",
          errors: [{ message: "Email already registered" }],
        }).takeover().code(400);
      }

      await db.userStore.addUser(request.payload);
      return h.redirect("/login");
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

  //update account

   updateAccount: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);

        return h.view("account-view", {
          title: "Account Settings",
          user: loggedInUser,
          errors: error.details,
        }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);

      if (!loggedInUser) {
        request.cookieAuth.clear();
        return h.redirect("/login");
      }

      const updatedUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };

      await db.userStore.updateUser(loggedInUser._id, updatedUser);

      const refreshedUser = await db.userStore.getUserById(loggedInUser._id);

      request.cookieAuth.set({
        _id: refreshedUser._id.toString(),
        email: refreshedUser.email,
      });

      return h.redirect("/account");
    },
  },


validate: 
  async validate (request, session) {
    if (!session || !session._id) {
      return { isValid: false };
    }
    const user = await db.userStore.getUserById(session._id);

    if (!user) {
    return { isValid: false };
  }
  
    return { isValid: true, credentials: user };
  },
};
