import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUser, testSalon } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Salon Model tests", () => {
  let user = null;
  setup(async () => {
    await db.init("mongo");
    await db.salonStore.deleteAllSalons();
    await db.userStore.deleteAll();
    user = await db.userStore.addUser(testUser);
  });

  test("create a salon", async () => {
    const returnedSalon = await db.salonStore.addSalon({ ...testSalon, userid: user._id });
    assert.isNotNull(returnedSalon);
    assertSubset({ ...testSalon, userid: user._id }, returnedSalon);
  });
});
