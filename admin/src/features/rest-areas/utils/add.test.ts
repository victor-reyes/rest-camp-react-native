import { test, describe } from "node:test";
import assert from "node:assert";
import { addRestAreas } from "./add";
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
};

describe("addRestAreas", () => {
  const mockAreas = [
    { ...mockArea, trafikverket_id: "existing1", latitude: 10, longitude: 20 },
    { ...mockArea, trafikverket_id: "existing2", latitude: 30, longitude: 40 },
    { ...mockArea, trafikverket_id: "existing3", latitude: 50, longitude: 60 },
    { ...mockArea, trafikverket_id: "existing4", latitude: 70, longitude: 80 },
    { ...mockArea, trafikverket_id: "existing5", latitude: 90, longitude: 100, deleted: true },
  ] as const;

  describe("when adding new rest areas", () => {
    test("should return empty added when no new areas", () => {
      const existedAreas = [...mockAreas];

      const expected = { added: [], unprocessed: [] };
      const result = addRestAreas(existedAreas, []);
      console.log(`Result is: ${JSON.stringify(result)}`);
      assert.deepStrictEqual(result, expected);
    });
    test("should add all unique new areas", () => {
      const uniqueAreas = [
        { ...mockArea, trafikverket_id: "new1", latitude: 1, longitude: 2 },
        { ...mockArea, trafikverket_id: "new2", latitude: 3, longitude: 4 },
        { ...mockArea, trafikverket_id: "new3", latitude: 5, longitude: 6 },
      ];
      const expected = { added: [...uniqueAreas], unprocessed: [] };
      const result = addRestAreas(mockAreas, uniqueAreas);
      assert.deepStrictEqual(result, expected);
    });
    test("should return unprocessed areas if there are duplicates by trafikverket_id", () => {
      const existedAreas = [...mockAreas];
      const duplicatedArea = { ...mockAreas[0], trafikverket_id: "existing1" };
      const newArea = { ...mockArea, trafikverket_id: "new1", latitude: 1, longitude: 2 };
      const newAreas = [duplicatedArea, newArea];

      const expected = { added: [{ ...newArea }], unprocessed: [{ ...duplicatedArea }] };
      const result = addRestAreas(existedAreas, newAreas);

      assert.deepStrictEqual(result, expected);
    });
    test("should return unprocessed areas if there are duplicates by coordinates", () => {
      const duplicateByCoordinates = { ...mockAreas[0], latitude: 10, longitude: 20 };
      const newArea = { ...mockArea, trafikverket_id: "new1", latitude: 1, longitude: 2 };
      const newAreas = [duplicateByCoordinates, newArea];

      const expected = { added: [{ ...newArea }], unprocessed: [{ ...duplicateByCoordinates }] };
      const result = addRestAreas(mockAreas, newAreas);

      assert.deepStrictEqual(result, expected);
    });
    test("should only add first unique area if multiple new areas have same coordinates or id", () => {
      const newArea = { ...mockArea, trafikverket_id: "duplicate", latitude: 1, longitude: 2 };
      const duplicateArea1 = { ...newArea, trafikverket_id: "duplicate2" };
      const duplicateArea2 = { ...newArea, latitude: 3, longitude: 4 };
      const newAreas = [newArea, duplicateArea1, duplicateArea2];

      const expected = {
        added: [{ ...newArea }],
        unprocessed: [{ ...duplicateArea1 }, { ...duplicateArea2 }],
      };
      const result = addRestAreas(mockAreas, newAreas);

      assert.deepStrictEqual(result, expected);
    });
  });
});
