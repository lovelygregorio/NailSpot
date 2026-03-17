/**
 * Salon Model Tests
 *
 * Tests direct database operations (MongoDB) for salons.
 * Focuses on creating and storing salon data correctly.
 */

import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUser, testSalon } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

// Suite of tests for the Salon model
suite("Salon Model tests", () => {
  let user = null;

  // Before each test, initialize the database, clear existing data, and create a test user to ensure a clean state for testing
  setup(async () => {
    await db.init("mongo");
    await db.salonStore.deleteAllSalons();
    await db.userStore.deleteAll();
    user = await db.userStore.addUser(testUser);
  });

  // Test creating a salon by adding a salon to the database and asserting that the returned salon data matches the expected values from testSalon
  test("create a salon", async () => {
    const returnedSalon = await db.salonStore.addSalon({ ...testSalon, userid: user._id });
    assert.isNotNull(returnedSalon); // salon should be created successfully
    assertSubset({ ...testSalon, userid: user._id }, returnedSalon); // returned salon should match the test salon data with the correct user ID
  });
});

