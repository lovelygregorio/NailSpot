/**
 * User Model Tests
 *
 * Tests database-level operations for users.
 * Ensures users are correctly created and stored in MongoDB.
 */
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUser } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User Model tests", () => {
  setup(async () => {

    // Initialize the database and clear existing user data to ensure a clean state for testing
    await db.init("mongo");

    // Clear all users from the database before each test to ensure a clean state for testing
    await db.userStore.deleteAll();
  });

  // Test creating a user by adding a user to the database and asserting that the returned user data matches the expected values from testUser
  test("create a user", async () => {
    const returnedUser = await db.userStore.addUser(testUser);

    // Assert that the returned user is not null, matches the test user data, and has an _id assigned by the database
    assert.isNotNull(returnedUser);

    // Check that the returned user data matches the expected values from testUser
    assertSubset(testUser, returnedUser);

    // Check that the created user has an _id assigned by the database
    assert.isDefined(returnedUser._id);
  });
});
