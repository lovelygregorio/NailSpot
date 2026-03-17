/**
 * Salon Mongo Store
 *
 * MongoDB data store for salons using Mongoose.
 * Handles CRUD operations and user/category-based queries.
 */
import { Salon } from "./salon.js";
import { serviceMongoStore } from "./service-mongo-store.js";

// Exported object containing methods to interact with the salon data in MongoDB
export const salonMongoStore = {
  async getAllSalons() {
    return Salon.find().lean();
  },

  // Retrieve a specific salon by its unique ID, including its associated services
  async getUserSalons(userid) {
    return Salon.find({ userid }).lean();
  },


  // Retrieve salons for a specific category based on the category ID
  async getSalonsByCategoryId(categoryid) {
    return Salon.find({ categoryid }).lean();
  },

  // Add a new salon to the MongoDB collection and return it with its assigned ID
  async addSalon(salon) {
    const newSalon = new Salon(salon);
    const salonObj = await newSalon.save();
    return this.getSalonById(salonObj._id);
  },

async getSalonById(id) {
  // If no ID is provided, return null
  if (!id) return null;

  try {
    // Find the salon by ID
    const salon = await Salon.findOne({ _id: id }).lean();

    // Return null if salon is not found
    if (!salon) return null;

    // Get all services linked to this salon
    const servicesList = await serviceMongoStore.getServicesBySalonId(salon._id);

    // Return salon data with linked services
    return {
      ...salon,
      servicesList,
    };
  } catch {
    // Return null if ID is invalid or query fails
    return null;
  }
},

// Update a specific salon's details based on its unique ID
  async updateSalon(salonOrId, updatedSalon) {

    // Determine the ID of the salon to update, whether salonOrId is an object or a direct ID
    const id = typeof salonOrId === "object" ? salonOrId._id : salonOrId;
    const salon = await Salon.findOne({ _id: id });

    // If no salon is found with the given ID, return null to indicate that the update cannot be performed
    if (salon) {

      // Update the salon's properties with the new details provided in updatedSalon
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

    // Return the updated salon data (without services) if the update was successful, or null if no salon was found with the given ID
    return salon; 
  },

  // Delete a salon by ID from the MongoDB collection
  async deleteSalonById(id) {
    try {
      await Salon.deleteOne({ _id: id });
    } catch {
      console.log("bad id");
    }
  },


  // Delete all salons from the MongoDB collection (used for testing or resetting data)
  async deleteAllSalons() {
    await Salon.deleteMany({});
  },
};
