import { services } from "../services/schema";
import { restAreas } from "./schema";

type RestAreaPoint = RestAreaStatus & { type: "Point" };
type RestAreaCluster = {
  type: "Cluster";
  id: string;
  latitude: number;
  longitude: number;
  count: number;
};

export type Point = RestAreaPoint | RestAreaCluster;

// database types
export type RestAreaSelect = typeof restAreas.$inferSelect;
export type ServiceSelect = typeof services.$inferSelect;

export type RestAreaInsert = typeof restAreas.$inferInsert;
export type ServiceInsert = typeof services.$inferInsert;

export type RestAreaStatus = Pick<RestAreaSelect, "id" | "latitude" | "longitude" | "status">;
export type Status = RestAreaSelect["status"];
