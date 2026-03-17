/**
 * User API Tests
 *
 * Tests user-related functionality including:
 * - Creating a user
 * - Retrieving users
 * - Authenticating a user
 */
import { assert } from "chai";
import { salonService } from "./api-helper.js";
import { testUser } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User API tests", () => {

  // reset authentication and clear users before each test to ensure a clean state for testing
  setup(async () => {
    salonService.clearAuth();
    await salonService.authenticate(testUser).catch(() => {});
    await salonService.deleteAllUsers().catch(() => {});
    salonService.clearAuth();
  });

  // Test creating a new user
  test("create user", async () => {
    const returnedUser = await salonService.createUser(testUser);

    assert.isNotNull(returnedUser); // user should be created successfully
    assertSubset(testUser, returnedUser);// returned user should match the test user data
    assert.isDefined(returnedUser._id); // created user should have an _id assigned by the database
  });

  // test retrieving all users
  test("get all users", async () => {
    await salonService.createUser(testUser);
    const returnedUsers = await salonService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
    assertSubset(testUser, returnedUsers[0]);
  });

  // Test retrieving a single user by ID
  test("get one user", async () => {
    const createdUser = await salonService.createUser(testUser);
    const returnedUser = await salonService.getUser(createdUser._id);
    assert.isNotNull(returnedUser);
    assertSubset(testUser, returnedUser);
  });

  // Test user authentication and JWT token generation
  test("authenticate user", async () => {
    await salonService.createUser(testUser);
    
    const authResponse = await salonService.authenticate(testUser);
    
    assert.isTrue(authResponse.success); // login should be successful
    assert.isDefined(authResponse.token); // response should include a JWT token
    assert.isDefined(authResponse._id); // response should include the user's _id
  });
});
