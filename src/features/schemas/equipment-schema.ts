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

type EquipmentCategory = z.infer<typeof EquipmentCategorySchema>;
type EquipmentAccessibility = z.infer<typeof EquipmentAccessibilitySchema>;
type Equipment = z.infer<typeof EquipmentSchema>;

export {
  EquipmentCategorySchema,
  EquipmentAccessibilitySchema,
  EquipmentSchema,
  EquipmentCategory,
  EquipmentAccessibility,
  Equipment,
  EQUIPMENTS,
};
