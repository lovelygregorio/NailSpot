import { assert } from "chai";
import { salonService } from "./api-helper.js";
import { testUser, testSalon, testSalons } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Salon API tests", () => {
  let user = null;

  setup(async () => {
    salonService.clearAuth();
    await salonService.authenticate(testUser).catch(() => {});
    await salonService.deleteAllUsers().catch(() => {});
    await salonService.deleteAllSalons().catch(() => {});
    salonService.clearAuth();
    user = await salonService.createUser(testUser);
    await salonService.authenticate(testUser);
  });

  test("create salon", async () => {
    const returnedSalon = await salonService.createSalon({ ...testSalon, userid: user._id });
    assert.isNotNull(returnedSalon);
    assertSubset({ ...testSalon, userid: user._id }, returnedSalon);
  });

  test("get all salons", async () => {
    for (const salon of testSalons) {
      
      await salonService.createSalon({ ...salon, userid: user._id });
    }
    const returnedSalons = await salonService.getAllSalons();
    assert.equal(returnedSalons.length, testSalons.length);
  });
});
