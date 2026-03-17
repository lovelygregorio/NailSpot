/**
 * Assert Subset Utility
 *
 * Compares two objects and checks that all properties
 * in the subset exist and match in the superset.
 * Used in tests to verify returned data without checking every field.
 */
import { assert } from "chai";

// Function to assert that all properties in the subset match those in the superset
export function assertSubset(subset, superset) {
 Object.keys(subset).forEach((key) => assert.deepEqual(superset[key], subset[key]));
}
