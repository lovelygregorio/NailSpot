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
import { testUser, testSalon, testService, testServices } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Service API tests", () => {
  // Before each test, clear authentication, authenticate with test user, and delete all users and salons to ensure a clean state for testing
  let user = null;
  let salon = null;

  // Setup runs before each test to reset data and authenticate user
  setup(async () => {
    salonService.clearAuth();

    // Clear existing data to ensure a clean state for testing
    await salonService.authenticate(testUser).catch(() => {});
    await salonService.deleteAllUsers().catch(() => {});
    await salonService.deleteAllSalons().catch(() => {});
    await salonService.deleteAllServices().catch(() => {});

    // Create fresh user and authenticate for testing
    salonService.clearAuth();
    user = await salonService.createUser(testUser);
    await salonService.authenticate(testUser);
    salon = await salonService.createSalon({ ...testSalon, userid: user._id });
  });

  // Test creating a service by sending a POST request to the API with the service data and asserting that the response contains the expected service information
  test("create service", async () => {
    const returnedService = await salonService.createService(salon._id, testService);

    // Assert that the returned service is not null and that its properties match the expected values from testService
    assert.isNotNull(returnedService);
    assertSubset(testService, returnedService);
  });

  // Test retrieving all services by creating multiple services, sending a GET request to the API, and asserting that the response contains the expected number of services
  test("get all services", async () => {

    // Create multiple services for testing retrieval
    for (const service of testServices) {
      // eslint-disable-next-line no-await-in-loop
      await salonService.createService(salon._id, service);
    }

    // Retrieve salons from API
    const returnedServices = await salonService.getAllServices();
    
    // Assert that the number of returned services matches the number of test services created
    assert.equal(returnedServices.length, testServices.length);
  });
});
