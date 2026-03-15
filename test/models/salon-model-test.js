import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUser, testSalon } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Salon Model tests", () => {

  setup(async () => {
    await db.init("mongo");
    await db.salonStore.deleteAllSalons();
    await db.userStore.deleteAll();
    user = await db.userStore.addUser(testUser);
  });

  test("create a salon", async () => {
    const salon = await db.salonStore.addSalon({ ...testSalon, userid: user._id });
    assertSubset(testSalon, salon);
    assert.isDefined(salon._id);
 });
});

 