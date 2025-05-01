import { z } from "zod";

const FacilityCategorySchema = z.enum(["touristInformation", "restaurant", "petrolStation"]);

const FacilitySchema = z.object({
  Type: FacilityCategorySchema,
});

type FacilityCategory = z.infer<typeof FacilityCategorySchema>;
type Facility = z.infer<typeof FacilitySchema>;

export { FacilityCategorySchema, FacilitySchema, FacilityCategory, Facility };
