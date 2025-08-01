import { z } from "zod";
import {
  EquipmentSchema,
  ErrorSchema,
  FacilitySchema,
  GeometrySchema,
  IconIdSchema,
  InfoSchema,
  OpenStatusSchema,
  OperationStatusSchema,
  ParkingAccessSchema,
  PhotoSchema,
  UsageScenarioSchema,
  VehicleCharacteristicsSchema,
} from "./index.ts";

function cleanString(s: string) {
  return s
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => (line.endsWith(".") ? line : line + "."))
    .join(" ");
}

const ParkingSchema = z.object({
  Deleted: z.boolean(),
  Description: z.string().transform(cleanString).optional(),
  DistanceToNearestCity: z.string().optional(),
  Equipment: z.array(EquipmentSchema),
  Facility: z.array(FacilitySchema).optional(),
  Geometry: GeometrySchema,
  IconId: IconIdSchema,
  Id: z.string(),
  LocationDescription: z.string().transform(cleanString).optional(),
  Name: z.string(),
  OpenStatus: OpenStatusSchema,
  OperationStatus: OperationStatusSchema.optional(),
  ParkingAccess: z.array(ParkingAccessSchema).optional(),
  Photo: z.array(PhotoSchema).optional(),
  UsageSenario: z.array(UsageScenarioSchema),
  VehicleCharacteristics: z.array(VehicleCharacteristicsSchema),
  ModifiedTime: z.string().datetime(),
});

const ResultSchema = z.object({
  Parking: z.array(ParkingSchema),
  ERROR: ErrorSchema.optional(),
  INFO: InfoSchema.optional(),
  id: z.string().optional(),
});

const ResponseSchema = z.object({
  RESPONSE: z.object({
    RESULT: z.array(ResultSchema),
  }),
});

export { ResponseSchema };
