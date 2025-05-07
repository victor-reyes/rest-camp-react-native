import { z } from "zod";

const FACILITIES = ["touristInformation", "restaurant", "petrolStation"] as const;
const FacilityCategorySchema = z.enum(FACILITIES);

const FacilitySchema = z.object({
  Type: FacilityCategorySchema,
});

type FacilityCategory = z.infer<typeof FacilityCategorySchema>;
type Facility = z.infer<typeof FacilitySchema>;

export { FacilityCategorySchema, FacilitySchema, FacilityCategory, Facility, FACILITIES };
