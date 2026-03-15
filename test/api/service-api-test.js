import { assert } from "chai";
import { salonService } from "./api-helper.js";
import { testUser, testSalon, testService, testServices } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Service API tests", () => {
  let user = null;
  let salon = null;

  setup(async () => {
    salonService.clearAuth();
    await salonService.authenticate(testUser).catch(() => {});
    await salonService.deleteAllUsers().catch(() => {});
    await salonService.deleteAllSalons().catch(() => {});
    await salonService.deleteAllServices().catch(() => {});
    salonService.clearAuth();
    user = await salonService.createUser(testUser);
    await salonService.authenticate(testUser);
    salon = await salonService.createSalon({ ...testSalon, userid: user._id });
  });

  test("create service", async () => {
    const returnedService = await salonService.createService(salon._id, testService);
    assert.isNotNull(returnedService);
    assertSubset(testService, returnedService);
  });

  test("get all services", async () => {
    for (const service of testServices) {
      // eslint-disable-next-line no-await-in-loop
      await salonService.createService(salon._id, service);
    }
    const returnedServices = await salonService.getAllServices();
    assert.equal(returnedServices.length, testServices.length);
  });
});
