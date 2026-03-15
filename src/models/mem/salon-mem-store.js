import { v4 } from "uuid";
import { trackMemStore } from "./service-mem-store.js";

let salon = [];

export const salonMemStore = {
  async getAllSalons() {
    return salon;
  },

  async addSalon(salon) {
    salon._id = v4();
    salon.push(salon);
    return salon;
  },

  async getSalonById(id) {
    const list = salon.find((item) => item._id === id);
     if (!salon) return null;
    return { ...salon, services: await serviceMemStore.getServicesBySalonId(salon._id) };
  },

   async getSalonsByCategoryId(categoryid) {
    return salons.filter((salon) => salon.categoryid === categoryid);
  },

  async getUserSalons(userid) {
    return salon.filter((salon) => salon.userid === userid);
  },

   async updateSalon(salonOrId, updatedSalon) {
    const id = typeof salonOrId === "object" ? salonOrId._id : salonOrId;
    const salon = salons.find((item) => item._id === id);
    if (!salon) return null;
    salon.name = updatedSalon.name;
    salon.area = updatedSalon.area;
    salon.address = updatedSalon.address;
    salon.services = updatedSalon.services;
    salon.rating = updatedSalon.rating;
    salon.notes = updatedSalon.notes;
    salon.latitude = updatedSalon.latitude;
    salon.longitude = updatedSalon.longitude;
    salon.categoryid = updatedSalon.categoryid;
    salon.userid = updatedSalon.userid;
    return salon;
  },


  async deleteSalonById(id) {
    const index = salon.findIndex((salon) => salon._id === id);
    if (index !== -1) salon.splice(index, 1);
  },

  async deleteAllSalons() {
    salon = [];
  },
};
