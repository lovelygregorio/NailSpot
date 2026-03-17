/**
 * Service Model Tests
 *
 * Tests database-level operations for services.
 * Ensures services are correctly created and linked to a salon.
 */
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUser, testSalon, testService } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Service Model tests", () => {
  let user = null;
  let salon = null;

  /** Before each test, initialize the database, clear existing data, and
  * create a test user and salon to ensure a clean state for testing 
  */
  setup(async () => {
    await db.init("mongo");
    await db.serviceStore.deleteAllServices();
    await db.salonStore.deleteAllSalons();
    await db.userStore.deleteAll();
    user = await db.userStore.addUser(testUser);
    salon = await db.salonStore.addSalon({ ...testSalon, userid: user._id });
  });

  /** Test creating a service by adding a service to the database and asserting
   * that the returned service data matches the expected values from testService
   */
  test("create a service", async () => {
    const returnedService = await db.serviceStore.addService(salon._id, testService);
    assert.isNotNull(returnedService);

    //check that the returned service data matches the expected values from testService
    assertSubset(testService, returnedService);
  });
});
