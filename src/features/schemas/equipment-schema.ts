import { z } from "zod";

const EquipmentCategorySchema = z.enum([
  "refuseBin",
  "toilet",
  "picnicFacilities",
  "playground",
  "dumpingStation",
]);

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
};
