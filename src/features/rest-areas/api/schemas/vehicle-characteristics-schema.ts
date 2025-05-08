import { z } from "zod";

const VehicleShema = z.enum(["car", "lorry"]);
const VehicleCharacteristicsSchema = z.object({
  VehicleType: VehicleShema,
  NumberOfSpaces: z.number().int(),
});

export { VehicleShema, VehicleCharacteristicsSchema };
