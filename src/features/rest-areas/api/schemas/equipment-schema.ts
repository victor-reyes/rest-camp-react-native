import { z } from "zod";

const EQUIPMENTS = [
  "refuseBin",
  "toilet",
  "picnicFacilities",
  "playground",
  "dumpingStation",
] as const;

const EquipmentCategorySchema = z.enum(EQUIPMENTS);

const EquipmentAccessibilitySchema = z.enum(["handicappedAccessible"]);

const EquipmentSchema = z.object({
  Type: EquipmentCategorySchema,
  Accessibility: EquipmentAccessibilitySchema.optional(),
});

export { EquipmentCategorySchema, EquipmentAccessibilitySchema, EquipmentSchema, EQUIPMENTS };
