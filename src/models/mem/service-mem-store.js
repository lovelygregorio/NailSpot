/**
 * Service Memory Store
 *
 * In-memory data store for services.
 * Used to manage service data without a database
 * during development or testing.
 */

import { v4 } from "uuid";

// In-memory array to hold service data
let services = [];


// Exported object containing methods to interact with the service data
export const serviceMemStore = {
  async getAllServices() { // Retrieve all services from the in-memory store
    return services; // Return the entire array of services
  },

  // Add a new service to the in-memory store and assign it a unique ID
  async addService(salonidOrService, service) {
    
    // Build a new service object from the provided salon ID or service details
    const serviceToSave = service
      ? { ...service, salonid: salonidOrService }
      : { ...salonidOrService };
    serviceToSave._id = v4(); // Generate a unique ID for the new service
    services.push(serviceToSave); // Add the new service to the array
    return serviceToSave; // Return the newly added service with its assigned ID
  },

  // Retrieve services associated with a specific salon ID
  async getServicesBySalonId(id) { 
    return services.filter((service) => service.salonid === id);
  },

  // Retrieve a specific service by its unique ID
  async getServiceById(id) {
    return services.find((service) => service._id === id) || null;
  },

  // Delete a specific service by its unique ID from the in-memory store
  async deleteService(id) {
    const index = services.findIndex((service) => service._id === id);
    if (index !== -1) services.splice(index, 1);
  },

  // Delete a specific service by its unique ID from the in-memory store
  async deleteServiceById(id) {
    return this.deleteService(id);
  },

  // Delete all services associated with a specific salon ID from the in-memory store
  async deleteServicesBySalonId(id) {
    services = services.filter((service) => service.salonid !== id);
  },

  // Delete all services from the in-memory store (used for testing or resetting data)
  async deleteAllServices() {
    services = [];
  },

  // Update a specific service's details based on its unique ID
  async updateService(service, updatedService) {

    service.title = updatedService.title; 
    service.category = updatedService.category;
    service.price = updatedService.price;
    return service; // Return the updated service object
  },
};
