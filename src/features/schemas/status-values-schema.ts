import { z } from "zod";

const OperationStatusSchema = z.enum(["inOperation", "limitedOperation", "outOfService"]);
const OpenStatusSchema = z.enum(["open", "closed"]);
const UsageScenarioSchema = z.enum(["restArea", "truckParking"]);
const IconIdSchema = z.enum(["restArea", "restArea-closed", "restArea-closed-partially"]);

type OperationStatus = z.infer<typeof OperationStatusSchema>;
type OpenStatus = z.infer<typeof OpenStatusSchema>;
type UsageScenario = z.infer<typeof UsageScenarioSchema>;
type IconId = z.infer<typeof IconIdSchema>;

export {
  OperationStatusSchema,
  OpenStatusSchema,
  UsageScenarioSchema,
  IconIdSchema,
  OperationStatus,
  OpenStatus,
  UsageScenario,
  IconId,
};
