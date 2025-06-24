import { test, describe } from "node:test";
import assert from "node:assert";
import { updateRestAreas } from "./update";
import type { RestAreaWithInfo } from "@/api/supabase";

const mockArea: RestAreaWithInfo = {
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
} as const;

describe("updateRestAreas", () => {
  const mockAreas = [
    { ...mockArea, trafikverket_id: "1", name: "Area 1" },
    { ...mockArea, trafikverket_id: "2", name: "Area 2" },
    { ...mockArea, trafikverket_id: "3", name: "Area 3" },
  ] as const;

  test("should find updates for matching IDs", () => {
    const existedAreas = [...mockAreas];
    const updatedAreas = [{ ...mockAreas[0], name: "Updated Area 1" }];

    const expected = {
      updated: [{ id: updatedAreas[0].id, versions: [...updatedAreas] }],
      unprocessed: [],
    };
    const result = updateRestAreas(existedAreas, updatedAreas);

    assert.deepStrictEqual(result, expected);
  });

  test("should mark non-matching areas as unprocessed", () => {
    const existedAreas = [...mockAreas];
    const nonMatchingAreas = [{ ...mockAreas[1], trafikverket_id: "4" }];

    const expected = { updated: [], unprocessed: [...nonMatchingAreas] };
    const result = updateRestAreas(existedAreas, nonMatchingAreas);

    assert.deepStrictEqual(result, expected);
  });

  test("should handle empty arrays", () => {
    const result = updateRestAreas([], []);
    const expected = { updated: [], unprocessed: [] };

    assert.deepStrictEqual(result, expected);
  });

  test("should handle multiple versions of same area", () => {
    const versions = [
      { ...mockAreas[0], name: "Version 1" },
      { ...mockAreas[0], name: "Version 2" },
    ];
    const existedAreas = [{ ...mockAreas[0] }];

    const expected = {
      updated: [{ id: mockAreas[0].id, versions: [...versions] }],
      unprocessed: [],
    };
    const result = updateRestAreas(existedAreas, versions);

    assert.deepStrictEqual(result, expected);
  });
});
