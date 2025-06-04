import { z } from "zod";

const FACILITIES = ["touristInformation", "restaurant", "petrolStation"] as const;
const FacilityCategorySchema = z.enum(FACILITIES);

const FacilitySchema = z.object({
  Type: FacilityCategorySchema,
});

export { FacilityCategorySchema, FacilitySchema, FACILITIES };
