import { test, describe } from "node:test";
import assert from "node:assert";
import { mergeRestAreas } from "./merge";
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
};

describe("mergeRestAreas", () => {
  const mockAreas = [
    { ...mockAreaTemplate, latitude: 10, longitude: 20, trafikverket_id: "1", id: "area1" },
    { ...mockAreaTemplate, latitude: 11, longitude: 21, trafikverket_id: "2", id: "area2" },
    { ...mockAreaTemplate, latitude: 12, longitude: 22, trafikverket_id: "3", id: "area3" },
  ] as const;

  test("should merge areas with same coordinates but different trafikverket_id", () => {
    const existingAreas = [...mockAreas];
    const newAreas = [{ ...mockAreas[0], trafikverket_id: "new-tvk" }];
    const id = existingAreas[0].id;
    const expected = { merged: [{ id, versions: [...newAreas] }], unprocessed: [] };
    const result = mergeRestAreas(existingAreas, newAreas);

    assert.deepStrictEqual(result, expected);
  });

  test("should not merge if trafikverket_id is the same", () => {
    const newArea = { ...mockAreas[0], id: "new-id" };
    const { merged, unprocessed } = mergeRestAreas([mockAreas[0]], [newArea]);
    assert.strictEqual(merged.length, 0);
    assert.strictEqual(unprocessed.length, 1);
    assert.strictEqual(unprocessed[0].id, "new-id");
  });

  test("should not merge if coordinates are different", () => {
    const newArea = { ...mockAreas[0], latitude: 99, trafikverket_id: "new-tvk", id: "new-id" };
    const { merged, unprocessed } = mergeRestAreas([mockAreas[0]], [newArea]);
    assert.strictEqual(merged.length, 0);
    assert.strictEqual(unprocessed.length, 1);
    assert.strictEqual(unprocessed[0].id, "new-id");
  });

  test("should handle multiple merges", () => {
    const existingAreas = [...mockAreas];
    const newAreas = [
      { ...mockAreas[0], trafikverket_id: "a", id: "a" },
      { ...mockAreas[1], trafikverket_id: "b", id: "b" },
    ];

    const expected = {
      merged: [
        { id: "area1", versions: [{ ...newAreas[0] }] },
        { id: "area2", versions: [{ ...newAreas[1] }] },
      ],
      unprocessed: [],
    };
    const result = mergeRestAreas(existingAreas, newAreas);
    assert.deepStrictEqual(result, expected);
  });

  test("should handle empty arrays", () => {
    const expected = { merged: [], unprocessed: [] };
    const result = mergeRestAreas([], []);
    assert.deepStrictEqual(result, expected);
  });
});
