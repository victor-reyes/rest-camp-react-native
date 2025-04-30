import { z } from "zod";

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
  Type: z.enum(equipmentTypeValues),
  Accessibility: z.enum(equipmentAccessibilityValues).optional(),
});

const FacilitySchema = z.object({
  Type: z.enum(facilityTypeValues),
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
  Contact: z.string(),
  ContactEmail: z.string(),
  ContactTelephoneNumber: z.string(),
  Name: z.string(),
});

const ParkingAccessSchema = z.object({
  SWEREF99TM: z.string(),
  WGS84: z.string(),
});

const PhotoSchema = z.object({
  Title: z.string(),
  Url: z.string(),
});

const TariffsAndPaymentSchema = z.object({
  FreeOfCharge: z.boolean(),
  Tariff: z.string().optional(),
});

const VehicleCharacteristicsSchema = z.object({
  VehicleType: z.enum(vehicleTypeValues),
  NumberOfSpaces: z.number().int(),
  LoadType: z.string().optional(),
});

const ParkingSchema = z.object({
  CountyNo: z.array(z.number().int()),
  Deleted: z.boolean(),
  Description: z.string().optional(),
  DistanceToNearestCity: z.string().optional(),
  Equipment: z.array(EquipmentSchema),
  Facility: z.array(FacilitySchema).optional(),
  Geometry: GeometrySchema,
  IconId: z.enum(iconIdValues),
  Id: z.string(),
  LocationDescription: z.string().optional(),
  Name: z.string(),
  OpenStatus: z.enum(openStatusValues),
  OperationStatus: z.enum(operationStatusValues).optional(),
  Operator: OperatorSchema.optional(),
  ParkingAccess: z.array(ParkingAccessSchema).optional(),
  Photo: z.array(PhotoSchema).optional(),
  TariffsAndPayment: TariffsAndPaymentSchema.optional(),
  UsageSenario: z.array(z.enum(usageScenarioValues)),
  VehicleCharacteristics: z.array(VehicleCharacteristicsSchema),
  ModifiedTime: z.string().datetime(),
});

const ErrorSchema = z.object({
  SOURCE: z.string().optional(),
  MESSAGE: z.string().optional(),
});

const LastModifiedSchema = z.object({
  datetime: z.string().datetime(),
});

const EvalResultSchema = z.object({}); // xs:any, so allow any object

const InfoSchema = z.object({
  LASTMODIFIED: LastModifiedSchema.optional(),
  LASTCHANGEID: z.string().optional(),
  EVALRESULT: z.array(EvalResultSchema).optional(),
  SSEURL: z.string().optional(),
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

type Response = z.infer<typeof ResponseSchema>;
type Parking = z.infer<typeof ParkingSchema>;
type Equipment = z.infer<typeof EquipmentSchema>;
type Facility = z.infer<typeof FacilitySchema>;
type Geometry = z.infer<typeof GeometrySchema>;
type Operator = z.infer<typeof OperatorSchema>;
type ParkingAccess = z.infer<typeof ParkingAccessSchema>;
type Photo = z.infer<typeof PhotoSchema>;
type Payment = z.infer<typeof TariffsAndPaymentSchema>;
type VehicleCharacteristics = z.infer<typeof VehicleCharacteristicsSchema>;

export {
  ResponseSchema,
  Response,
  Parking,
  Equipment,
  Facility,
  Geometry,
  Operator,
  ParkingAccess,
  Photo,
  Payment,
  VehicleCharacteristics,
};
