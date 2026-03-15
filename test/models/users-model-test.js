import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User Model tests", () => {

  setup(async () => {
    await db.init("mongo");
    await db.userStore.deleteAll();
  });

  test("create a user", async () => {
    const returnedUser = await db.userStore.addUser(testUser);
    assert.isNotNull(returnedUser);
    assertSubset(testUser, returnedUser);
    assert.isDefined(returnedUser._id);
  });
});

