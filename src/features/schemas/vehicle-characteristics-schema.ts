import { z } from "zod";

const VehicleShema = z.enum(["car", "lorry"]);
const VehicleCharacteristicsSchema = z.object({
  VehicleType: VehicleShema,
  NumberOfSpaces: z.number().int(),
});

type Vehicle = z.infer<typeof VehicleShema>;
type VehicleCharacteristics = z.infer<typeof VehicleCharacteristicsSchema>;

export { VehicleShema, VehicleCharacteristicsSchema, Vehicle, VehicleCharacteristics };
