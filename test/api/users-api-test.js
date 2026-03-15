import { assert } from "chai";
import { salonService } from "./api-helper.js";
import { testUser } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User API tests", () => {
  setup(async () => {
    salonService.clearAuth();
    await salonService.authenticate(testUser).catch(() => {});
    await salonService.deleteAllUsers().catch(() => {});
    salonService.clearAuth();
  });

  test("create user", async () => {
    const returnedUser = await salonService.createUser(testUser);
    assert.isNotNull(returnedUser);
    assertSubset(testUser, returnedUser);
    assert.isDefined(returnedUser._id);
  });

  test("get all users", async () => {
    await salonService.createUser(testUser);
    const returnedUsers = await salonService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
    assertSubset(testUser, returnedUsers[0]);
  });

  test("get one user", async () => {
    const createdUser = await salonService.createUser(testUser);
    const returnedUser = await salonService.getUser(createdUser._id);
    assert.isNotNull(returnedUser);
    assertSubset(testUser, returnedUser);
  });

  test("authenticate user", async () => {
    await salonService.createUser(testUser);
    const authResponse = await salonService.authenticate(testUser);
    assert.isTrue(authResponse.success);
    assert.isDefined(authResponse.token);
    assert.isDefined(authResponse._id);
  });
});
