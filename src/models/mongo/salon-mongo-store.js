import { Salon } from "./salon.js";
import { serviceMongoStore } from "./service-mongo-store.js";

export const salonMongoStore = {
  async getAllSalons() {
    return Salon.find().lean();
  },

  async getUserSalons(userid) {
    return Salon.find({ userid }).lean();
  },

  async getSalonsByCategoryId(categoryid) {
    return Salon.find({ categoryid }).lean();
  },

  async addSalon(salon) {
    const newSalon = new Salon(salon);
    const salonObj = await newSalon.save();
    return this.getSalonById(salonObj._id);
  },

 async getSalonById(id) {
  if (!id) return null;
  try {
    const salon = await Salon.findOne({ _id: id }).lean();
    if (!salon) return null;
    return salon;
  } catch {
    return null;
  }
},

  async updateSalon(salonOrId, updatedSalon) {
    const id = typeof salonOrId === "object" ? salonOrId._id : salonOrId;
    const salon = await Salon.findOne({ _id: id });
    if (salon) {
      salon.name = updatedSalon.name;
      salon.area = updatedSalon.area;
      salon.address = updatedSalon.address;
      salon.services = updatedSalon.services;
      salon.rating = updatedSalon.rating;
      salon.notes = updatedSalon.notes;
      salon.latitude = updatedSalon.latitude;
      salon.longitude = updatedSalon.longitude;
      salon.image = updatedSalon.image;
      salon.categoryid = updatedSalon.categoryid;
      salon.userid = updatedSalon.userid;
      await salon.save();
    }
    return salon;
  },

  async deleteSalonById(id) {
    try {
      await Salon.deleteOne({ _id: id });
    } catch {
      console.log("bad id");
    }
  },

  async deleteAllSalons() {
    await Salon.deleteMany({});
  },
};
