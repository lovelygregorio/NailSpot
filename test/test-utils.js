import { assert } from "chai";

export function assertSubset(subset, superset) {
 Object.keys(subset).forEach((key) => assert.deepEqual(superset[key], subset[key]));
}
