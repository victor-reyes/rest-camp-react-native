import { test, describe } from "node:test";
import assert from "node:assert";
import { updateRestAreas } from "./update";
import type { RestAreaWithInfo } from "@/api/supabase";

const mockAreaTemplate: RestAreaWithInfo = {
  id: "test",
  name: "Test Area",
  latitude: 10.0,
  longitude: 20.0,
  description: "A test area",
  local_description: "Local description",
  status: "inOperation",
  trafikverket_id: "tvk-123",
  deleted: false,
  updated_at: "2023-10-01T12:00:00Z",
  services: [],
  photos: [],
  reviews: [],
};

describe("updateRestAreas", () => {
  const mockAreas = [
    { ...mockAreaTemplate, trafikverket_id: "1", name: "Area 1" },
    { ...mockAreaTemplate, trafikverket_id: "2", name: "Area 2" },
    { ...mockAreaTemplate, trafikverket_id: "3", name: "Area 3" },
  ] as const;

  test("should find updates for matching IDs", () => {
    const updatedArea: RestAreaWithInfo = { ...mockAreas[0], name: "Updated Area 1" };
    const { updated, unprocessed } = updateRestAreas(mockAreas, [updatedArea]);

    assert.strictEqual(updated.length, 1);
    assert.strictEqual(updated[0].versions.length, 2);
    assert.strictEqual(updated[0].versions[0].name, "Updated Area 1");
    assert.strictEqual(unprocessed.length, 0);
  });

  test("should mark non-matching areas as unprocessed", () => {
    const newArea: RestAreaWithInfo = { ...mockAreas[1], trafikverket_id: "4" };
    const { updated, unprocessed } = updateRestAreas(mockAreas, [newArea]);

    assert.strictEqual(updated.length, 0);
    assert.strictEqual(unprocessed.length, 1);
    assert.strictEqual(unprocessed[0].trafikverket_id, "4");
  });

  test("should handle empty arrays", () => {
    const { updated, unprocessed } = updateRestAreas([], []);

    assert.strictEqual(updated.length, 0);
    assert.strictEqual(unprocessed.length, 0);
  });

  test("should handle multiple versions of same area", () => {
    const version1: RestAreaWithInfo = { ...mockAreas[0], name: "Version 1" };
    const version2: RestAreaWithInfo = { ...mockAreas[0], name: "Version 2" };
    const { updated, unprocessed } = updateRestAreas([mockAreas[0]], [version1, version2]);

    assert.strictEqual(updated.length, 1);
    assert.strictEqual(updated[0].versions.length, 3);
    assert.strictEqual(unprocessed.length, 0);
  });
});
