/**
 * Service Mongo Store
 *
 * MongoDB data store for services using Mongoose.
 * Handles CRUD operations and links services to salons.
 */


import { Service } from "./service.js";

// Provides methods to interact with service data in MongoDB
export const serviceMongoStore = {

  // Retrieve all services from the MongoDB collection
  async getAllServices() {
    return Service.find().lean();
  },

  // Retrieve services associated with a specific salon ID from the MongoDB collection
  async getServicesBySalonId(id) {
    return Service.find({ salonid: id }).lean();
  },


  // Add a new service to the MongoDB collection and return it with its assigned ID
  async addService(salonidOrService, service) {
    // Build a new service object from the provided salon ID or service details
    const serviceToSave = service
      ? { ...service, salonid: salonidOrService }
      : { ...salonidOrService };
    const newService = new Service(serviceToSave);

    // Save the new service to the MongoDB collection and return the saved document
    return newService.save(); 
  },

  // Retrieve a specific service by its unique ID from the MongoDB collection
  async getServiceById(id) {
    if (!id) return null;
    try {
      return await Service.findOne({ _id: id }).lean();
    } catch {
      return null;
    }
  },

  // Delete a specific service by its unique ID from the MongoDB collection
  async deleteService(id) {
      try {
      await Service.deleteOne({ _id: id });
    } catch {
      // ignore bad ids
    }
  },

  // Delete a specific service by its unique ID from the MongoDB collection
  async deleteServiceById(id) {
    return this.deleteService(id);
  },

  // Delete all services associated with a specific salon ID from the MongoDB collection
  async deleteServicesBySalonId(id) {
    await Service.deleteMany({ salonid: id });
  },


  // Delete all services from the MongoDB collection (used for testing or resetting data)
  async deleteAllServices() {
    await Service.deleteMany({});
  },

  // Update a specific service's details based on its unique ID
  async updateService(service, updatedService) {
   const serviceDoc = await Service.findOne({ _id: service._id });
   
    // Return null if service does not exist 
    if (!serviceDoc) return null;

    // update fields
    serviceDoc.title = updatedService.title;
    serviceDoc.category = updatedService.category;
    serviceDoc.price = updatedService.price;

    await serviceDoc.save();
    return serviceDoc;
  },
};
