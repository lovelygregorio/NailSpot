/**
 * Authentication API Tests
 *
 * Tests user authentication functionality including:
 * - Login and token generation
 * - JWT token verification
 * - Protected route access
 */
import { assert } from "chai";
import { salonService } from "./api-helper.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { testUser } from "../fixtures.js";

suite("Authentication API tests", () => {
//  Before each test, clear authentication, authenticate with test user, and delete all users to ensure a clean state for testing
  setup(async () => {
    salonService.clearAuth();
    await salonService.authenticate(testUser).catch(() => {});
    await salonService.deleteAllUsers().catch(() => {});
    salonService.clearAuth();
  });

  // Test user authentication and JWT token generation
  test("authenticate", async () => {
    const returnedUser = await salonService.createUser(testUser);
    const response = await salonService.authenticate(testUser);
// Assert that the authentication response indicates success, includes a token, and that the returned user ID matches the created user ID
    assert.isTrue(response.success);
    assert.isDefined(response.token);
    assert.equal(response._id, returnedUser._id);
  });

  // Test JWT token verification by decoding the token and checking that the user information matches the expected values
  test("verify Token", async () => {
    const returnedUser = await salonService.createUser(testUser);
    const response = await salonService.authenticate(testUser);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  // Test that protected routes are inaccessible without a valid JWT token by attempting to access a protected route and expecting an unauthorized error response
  test("check Unauthorized", async () => {
    // Clear authentication to simulate an unauthenticated request
    salonService.clearAuth();
    try {
      await salonService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
