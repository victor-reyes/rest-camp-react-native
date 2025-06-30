import { restAreas, photos, services } from "@/db";

type RestAreaPoint = RestAreaStatus & { type: "Point" };
type RestAreaCluster = {
  type: "Cluster";
  id: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  count: number;
};

export type Point = RestAreaPoint | RestAreaCluster;

export type Filter = Service;

export type RestArea = typeof restAreas.$inferSelect;
export type RestAreaStatus = Pick<RestArea, "id" | "latitude" | "longitude" | "status">;
export type Status = RestArea["status"];

export type Photo = typeof photos.$inferSelect;
export type ServiceSelect = typeof services.$inferSelect;
export type Service = ServiceSelect["name"];

export type RestAreaInsert = typeof restAreas.$inferInsert;
export type ServiceInsert = typeof services.$inferInsert;
export type PhotoInsert = typeof photos.$inferInsert;
