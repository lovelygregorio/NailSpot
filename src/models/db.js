import { userMemStore } from "./mem/user-mem-store.js";
import { salonMemStore } from "./mem/salon-mem-store.js";
import { serviceMemStore } from "./mem/service-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { salonMongoStore } from "./mongo/salon-mongo-store.js";
import { serviceMongoStore } from "./mongo/service-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";

import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: userMongoStore,
  salonStore: salonMongoStore,
  serviceStore: serviceMongoStore,
  categoryStore: categoryMongoStore,

  async init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.salonStore = salonMongoStore;
        this.serviceStore = serviceMongoStore;
        this.categoryStore = categoryMongoStore;

        await connectMongo();
        break;

      case "mem":
      default:
        this.userStore = userMemStore;
        this.salonStore = salonMemStore;
        this.serviceStore = serviceMemStore;
        this.categoryStore = categoryMemStore;
        break;
    }
  },
};