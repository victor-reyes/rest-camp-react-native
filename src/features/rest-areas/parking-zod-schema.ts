import { infer, z } from "zod";

// Equipment types from XSD documentation
const equipmentTypeValues = [
  "toilet",
  "shower",
  "informationPoint",
  "informatonStele",
  "internetTerminal",
  "internetWireless",
  "payDesk",
  "paymentMachine",
  "cashMachine",
  "vendingMachine",
  "faxMachineOrService",
  "copyMachineOrService",
  "safeDeposit",
  "luggageLocker",
  "publicPhone",
  "publicCoinPhone",
  "publicCardPhone",
  "elevator",
  "picnicFacilities",
  "dumpingStation",
  "freshWater",
  "wasteDisposal",
  "refuseBin",
  "iceFreeScaffold",
  "playground",
  "electricChargingStation",
  "bikeParking",
  "tollTerminal",
  "defibrillator",
  "firstAidEquipment",
  "fireHose",
  "fireExtingiusher",
  "fireHydrant",
  "none",
  "unknown",
  "other",
] as const;

const equipmentAccessibilityValues = [
  "barrierFreeAccessible",
  "handicappedAccessible",
  "wheelChairAccessible",
  "handicappedEasements",
  "orientationSystemForBlindPeople",
  "handicappedMarked",
  "none",
  "unknown",
  "other",
] as const;

const facilityAccessibilityValues = [
  "barrierFreeAccessible",
  "handicappedAccessible",
  "wheelChairAccessible",
  "handicappedEasements",
  "orientationSystemForBlindPeople",
  "handicappedMarked",
  "none",
  "unknown",
  "other",
] as const;

const facilityTypeValues = [
  "picnicFacilities",
  "playground",
  "touristInformation",
  "restaurant",
  "petrolStation",
  "other",
  "none",
  "unknown",
] as const;

const operationStatusValues = ["inOperation", "limitedOperation", "outOfService"] as const;
const openStatusValues = ["open", "closed"] as const;
const vehicleTypeValues = ["car", "lorry"] as const;
const usageScenarioValues = ["restArea", "truckParking"] as const;
const iconIdValues = ["restArea", "restArea-closed", "restArea-closed-partially"] as const;

const EquipmentSchema = z.object({
  Type: z.enum(equipmentTypeValues).optional(),
  Accessibility: z.enum(equipmentAccessibilityValues).optional(),
});

const FacilitySchema = z.object({
  Type: z.enum(facilityTypeValues).optional(),
  Accessibility: z.enum(facilityAccessibilityValues).optional(),
});

function parseWGS84Point(pointStr: string) {
  const match = pointStr.match(/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/)!;
  return {
    longitude: parseFloat(match[1]),
    latitude: parseFloat(match[2]),
  };
}

const GeometrySchema = z
  .object({
    SWEREF99TM: z.string(),
    WGS84: z.string(),
  })
  .transform(data => {
    const coordinate = parseWGS84Point(data.WGS84);
    return { ...coordinate };
  });

const OperatorSchema = z.object({
  Contact: z.string().optional(),
  ContactEmail: z.string().optional(),
  ContactTelephoneNumber: z.string().optional(),
  Name: z.string().optional(),
});

const ParkingAccessSchema = z.object({
  SWEREF99TM: z.string().optional(),
  WGS84: z.string().optional(),
});

const PhotoSchema = z.object({
  Title: z.string().optional(),
  Url: z.string().optional(),
});

const TariffsAndPaymentSchema = z.object({
  FreeOfCharge: z.boolean().optional(),
  Tariff: z.string().optional(),
});

const VehicleCharacteristicsSchema = z.object({
  VehicleType: z.enum(vehicleTypeValues).optional(),
  NumberOfSpaces: z.number().int().min(0).max(255).optional(),
  LoadType: z.string().optional(),
});

const ParkingSchema = z.object({
  CountyNo: z.array(z.number().int()).optional(),
  Deleted: z.boolean().optional(),
  Description: z.string().optional(),
  DistanceToNearestCity: z.string().optional(),
  Equipment: z.array(EquipmentSchema).optional(),
  Facility: z.array(FacilitySchema).optional(),
  Geometry: GeometrySchema,
  IconId: z.enum(iconIdValues).optional(),
  Id: z.string().optional(),
  LocationDescription: z.string().optional(),
  Name: z.string().optional(),
  OpenStatus: z.enum(openStatusValues).optional(),
  OperationStatus: z.enum(operationStatusValues).nullable().optional(),
  Operator: OperatorSchema.optional(),
  ParkingAccess: z.array(ParkingAccessSchema).optional(),
  Photo: z.array(PhotoSchema).optional(),
  TariffsAndPayment: TariffsAndPaymentSchema.optional(),
  UsageSenario: z.array(z.enum(usageScenarioValues)).optional(),
  VehicleCharacteristics: z.array(VehicleCharacteristicsSchema).optional(),
  ModifiedTime: z.string().datetime().optional(),
});

const ErrorSchema = z.object({
  SOURCE: z.string().optional(),
  MESSAGE: z.string().optional(),
});

const LastModifiedSchema = z.object({
  datetime: z.string().datetime().optional(),
});

const EvalResultSchema = z.object({}); // xs:any, so allow any object

const InfoSchema = z.object({
  LASTMODIFIED: LastModifiedSchema.optional(),
  LASTCHANGEID: z.string().optional(),
  EVALRESULT: z.array(EvalResultSchema).optional(),
  SSEURL: z.string().optional(),
});

const ResultSchema = z.object({
  Parking: z.array(ParkingSchema).optional(),
  ERROR: ErrorSchema.optional(),
  INFO: InfoSchema.optional(),
  id: z.string().optional(),
});

const ResponseSchema = z.object({
  RESPONSE: z.object({
    RESULT: z.array(ResultSchema),
  }),
});

type Response = z.infer<typeof ResponseSchema>;
type Parking = z.infer<typeof ParkingSchema>;

export { ResponseSchema, Response, Parking };
