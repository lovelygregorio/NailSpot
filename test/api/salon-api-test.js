/**
 * Salon API Tests
 *
 * Tests salon-related functionality including:
 * - Creating a salon
 * - Retrieving all salons
 * Ensures salons are correctly stored and returned from the API.
 */
import { assert } from "chai";
import { salonService } from "./api-helper.js";
import { testUser, testSalon, testSalons } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Salon API tests", () => {
  // Before each test, clear authentication, authenticate with test user, and delete all users and salons to ensure a clean state for testing
  let user = null;

  // Before each test, clear authentication, authenticate with test user, and delete all users and salons to ensure a clean state for testing
  setup(async () => {
    salonService.clearAuth();

    // clear existing data to ensure a clean state for testing
    await salonService.authenticate(testUser).catch(() => {});
    await salonService.deleteAllUsers().catch(() => {});
    await salonService.deleteAllSalons().catch(() => {});

    // create fresh user and authenticate for testing
    salonService.clearAuth();
    user = await salonService.createUser(testUser);
    await salonService.authenticate(testUser);
  });

  // test creating a salon by sending a POST request to the API with the salon data and asserting that the response contains the expected salon information
  test("create salon", async () => {
    const returnedSalon = await salonService.createSalon({ ...testSalon, userid: user._id });
    assert.isNotNull(returnedSalon);
    assertSubset({ ...testSalon, userid: user._id }, returnedSalon);
  });

// test retrieving all salons by creating multiple salons, sending a GET request to the API, and asserting that the response contains the expected number of salons
  test("get all salons", async () => {
    // Create multiple salons for testing retrieval
    for (const salon of testSalons) {
      await salonService.createSalon({ ...salon, userid: user._id });
    }

    // Retrieve all salons and assert that the number of returned salons matches the number of test salons created
    const returnedSalons = await salonService.getAllSalons();
    
    // Assert that the number of returned salons matches the number of test salons created
    assert.equal(returnedSalons.length, testSalons.length);
  });
});
