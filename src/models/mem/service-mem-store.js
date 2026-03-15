import { v4 } from "uuid";

let services= [];

export const servicesMemStore = {
  async getAllServices() {
    return services;
  },

  async addService(salonidOrService, service) {
   const serviceToSave = service
      ? { ...service, salonid: salonidOrService }
      : { ...salonidOrService };
    serviceToSave._id = v4();
    services.push(serviceToSave);
    return serviceToSave;
  },

  async getServicesBySalonId(id) {
    return services.filter((service) => service.salonid === id);
  },

  async getServiceById(id) {
    return services.find((service) => service._id === id) || null;
  },

  async getServicesBySalonId(salonId) {
    return services.filter((service) => service.salonid === salonId);
  },

  async deleteService(id) {
     const index = services.findIndex((service) => service._id === id);
    if (index !== -1) services.splice(index, 1);
  },

  async deleteServiceById() {
     return this.deleteService(id);
  },

async deleteServicesBySalonId(id) {
    services = services.filter((service) => service.salonid !== id);
  }

async deleteAllServices() {
    services = [];
  },


  async updateService(service, updatedService) {
    service.title = updatedService.title;
    service.category = updatedService.category;
    service.price = updatedService.duration;
    return service;
  },
};
