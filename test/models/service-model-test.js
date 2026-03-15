import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUser, testSalon, testService } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Service Model tests", () => {
  let user = null;
  let salon = null;
  setup(async () => {
    await db.init("mongo");
    await db.serviceStore.deleteAllServices();
    await db.salonStore.deleteAllSalons();
    await db.userStore.deleteAll();
    user = await db.userStore.addUser(testUser);
    salon = await db.salonStore.addSalon({ ...testSalon, userid: user._id });
  });

  test("create a service", async () => {
    const returnedService = await db.serviceStore.addService(salon._id, testService);
    assert.isNotNull(returnedService);
    assertSubset(testService, returnedService);
  });
});
