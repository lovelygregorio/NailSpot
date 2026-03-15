import { assert } from "chai";
import { salonService } from "./api-helper.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { testUser } from "../fixtures.js";

suite("Authentication API tests", () => {
  setup(async () => {
    salonService.clearAuth();
    await salonService.authenticate(testUser).catch(() => {});
    await salonService.deleteAllUsers().catch(() => {});
    salonService.clearAuth();
  });

  test("authenticate", async () => {
    const returnedUser = await salonService.createUser(testUser);
    const response = await salonService.authenticate(testUser);

    assert.isTrue(response.success);
    assert.isDefined(response.token);
    assert.equal(response._id, returnedUser._id);
  });

  test("verify Token", async () => {
    const returnedUser = await salonService.createUser(testUser);
    const response = await salonService.authenticate(testUser);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    salonService.clearAuth();
    try {
      await salonService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
