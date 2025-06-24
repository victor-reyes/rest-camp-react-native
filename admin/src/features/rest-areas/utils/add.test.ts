import { test, describe } from "node:test";
import assert from "node:assert";
import { addRestAreas } from "./add";
import type { RestAreaWithInfo } from "@/api/supabase";

const restArea: RestAreaWithInfo = {
  deleted: false,
  id: "test",
  name: "Test Area",
  description: "A test area",
  latitude: 10,
  longitude: 20,
  status: "inOperation",
  trafikverket_id: "tvk-123",
  updated_at: "2023-10-01T12:00:00Z",
  services: [],
  photos: [],
  reviews: [],
};

describe("addRestAreas", () => {
  const existingAreas: RestAreaWithInfo[] = [
    { ...restArea, trafikverket_id: "existing1", latitude: 10, longitude: 20 },
    { ...restArea, trafikverket_id: "existing2", latitude: 30, longitude: 40 },
    { ...restArea, trafikverket_id: "existing3", latitude: 50, longitude: 60 },
    { ...restArea, trafikverket_id: "existing4", latitude: 70, longitude: 80 },
    { ...restArea, trafikverket_id: "existing5", latitude: 90, longitude: 100, deleted: true },
  ];
  describe("when adding new rest areas", () => {
    test("should return empty added when no new areas", () => {
      const { added, unprocessed } = addRestAreas(existingAreas, []);
      assert.strictEqual(added.length, 0);
      assert.strictEqual(unprocessed.length, 0);
    });
    test("should add all unique new areas", () => {
      const uniqueAreas = [
        { ...restArea, trafikverket_id: "new1", latitude: 1, longitude: 2 },
        { ...restArea, trafikverket_id: "new2", latitude: 3, longitude: 4 },
        { ...restArea, trafikverket_id: "new3", latitude: 5, longitude: 6 },
      ];
      const { added, unprocessed } = addRestAreas(existingAreas, uniqueAreas);
      assert.strictEqual(added.length, 3);
      assert.strictEqual(unprocessed.length, 0);
      assert.deepStrictEqual(added[0], uniqueAreas[0]);
      assert.deepStrictEqual(added[1], uniqueAreas[1]);
      assert.deepStrictEqual(added[2], uniqueAreas[2]);
    });
    test("should return unprocessed areas if there are duplicates by trafikverket_id", () => {
      const duplicateId = { ...existingAreas[0], trafikverket_id: "existing1" };
      const newArea = { ...restArea, trafikverket_id: "new1", latitude: 1, longitude: 2 };

      const newAreas = [duplicateId, newArea];
      const { added, unprocessed } = addRestAreas(existingAreas, newAreas);
      console.log(`Adds length: ${added.length}`);
      console.log(`Unprocessed length: ${unprocessed.length}`);
      assert.strictEqual(added.length, 1);
      assert.strictEqual(unprocessed.length, 1);
      assert.deepStrictEqual(added[0], newArea);
      assert.deepStrictEqual(unprocessed[0], duplicateId);
    });
    test("should return unprocessed areas if there are duplicates by coordinates", () => {
      const duplicateCoordinates = { ...existingAreas[0], latitude: 10, longitude: 20 };
      const newArea = { ...restArea, trafikverket_id: "new1", latitude: 1, longitude: 2 };
      const newAreas = [duplicateCoordinates, newArea];
      const { added, unprocessed } = addRestAreas(existingAreas, newAreas);
      assert.strictEqual(added.length, 1);
      assert.strictEqual(unprocessed.length, 1);
      assert.deepStrictEqual(added[0], newArea);
      assert.deepStrictEqual(unprocessed[0], duplicateCoordinates);
    });
  });
});
