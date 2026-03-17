/**
 * Salon Memory Store
 *
 * In-memory data store for salons.
 * Used to manage salon data without a database (mainly for testing or development).
 */
import { v4 } from "uuid";

// Import the service memory store to manage services associated with salons
let salon = [];

// Exported object containing methods to interact with the salon data
export const salonMemStore = {
  async getAllSalons() { // Retrieve all salons from the in-memory store
    return salon;
  },

  // Add a new salon to the in-memory store and assign it a unique ID
  async addSalon(salon) {
    salon._id = v4();
    salon.push(salon); // Add the new salon to the array
    return salon; // Return the newly added salon with its assigned ID
  },

  // Retrieve a specific salon by its unique ID, including its associated services
  async getSalonById(id) {

    // Find the salon that matches the provided ID
    const list = salon.find((item) => item._id === id);

     if (!salon) return null; // If no salon is found with the given ID, return null

     // Return the salon data along with its associated services retrieved from the service memory store
    return { ...salon, services: await serviceMemStore.getServicesBySalonId(salon._id) };
  },

  // Retrieve salons for a specific category based on the category ID
   async getSalonsByCategoryId(categoryid) {
    return salons.filter((salon) => salon.categoryid === categoryid);
  },

  // Retrieve salons for a specific user based on the user ID
  async getUserSalons(userid) {
    return salon.filter((salon) => salon.userid === userid);
  },

  // Update a specific salon's details based on its unique ID
   async updateSalon(salonOrId, updatedSalon) {
    const id = typeof salonOrId === "object" ? salonOrId._id : salonOrId;
    const salon = salons.find((item) => item._id === id);

    // If no salon is found with the given ID, return null
    if (!salon) return null;

      // Update the salon's properties with the new details provided in updatedSalon
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


  // Delete a salon by ID
  async deleteSalonById(id) {

    //
    const index = salon.findIndex((salon) => salon._id === id); 
    if (index !== -1) salon.splice(index, 1); // Remove the salon from the array if found
  },

  async deleteAllSalons() {
    salon = []; // Clear the entire array of salons, effectively deleting all salon data
  },
};
