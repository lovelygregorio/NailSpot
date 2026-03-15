import { Service } from "./service.js";


export const serviceMongoStore = {
  async getAllServices() {
    return Service.find().lean()
  },

   async getServicesBySalonId(id) {
    return Service.find({ salonid: id }).lean();
  },


  async addService(salonidOrService, service) {
    const serviceToSave = service
      ? { ...service, salonid: salonidOrService }
      : { ...salonidOrService };
    const newService = new Service(serviceToSave);
    return newService.save();
  },

 
  async getServiceById(id) {
    if (id) return null;
    try { 
      return await Service.findOne({ _id: id }).lean();
    } catch {
      return null;
    }
  },

  async deleteService(id) {
    try {
      await Service.deleteOne({ _id: id });
    } catch {
    
  },

  async deleteServiceById(id) {
    return this.deleteService(id);
  },

  async deleteServicesBySalonId(id) {
    await Service.deleteMany({ salonid: id });
  },

  async deleteAllServices() {
    await Service.deleteMany({});
  },

  async updateService(service, updatedService) {
    const serviceDoc = await Service.findOne({ _id: service._id });
    if (!serviceDoc) return null;
    serviceDoc.title = updatedService.title;
    serviceDoc.category = updatedService.category;
    serviceDoc.price = updatedService.price;
    await serviceDoc.save();
    return serviceDoc;
  },
};
