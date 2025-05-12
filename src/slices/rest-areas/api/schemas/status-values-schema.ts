import { z } from "zod";

const OperationStatusSchema = z.enum(["inOperation", "limitedOperation", "outOfService"]);
const OpenStatusSchema = z.enum(["open", "closed"]);
const UsageScenarioSchema = z.enum(["restArea", "truckParking"]);
const IconIdSchema = z.enum(["restArea", "restArea-closed", "restArea-closed-partially"]);

export { OperationStatusSchema, OpenStatusSchema, UsageScenarioSchema, IconIdSchema };
