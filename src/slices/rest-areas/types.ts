import { restAreas, photos, services, reviews } from "@/db";

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

// database types
export type RestAreaSelect = typeof restAreas.$inferSelect;
export type PhotoSelect = typeof photos.$inferSelect;
export type ServiceSelect = typeof services.$inferSelect;
export type ReviewSelect = typeof reviews.$inferSelect;

export type RestAreaInsert = typeof restAreas.$inferInsert;
export type ServiceInsert = typeof services.$inferInsert;
export type PhotoInsert = typeof photos.$inferInsert;
export type ReviewInsert = typeof reviews.$inferInsert;

export type RestAreaStatus = Pick<RestAreaSelect, "id" | "latitude" | "longitude" | "status">;
export type Status = RestAreaSelect["status"];

export type Photo = Omit<PhotoSelect, "deleted">;
export type Service = ServiceSelect["name"];

export type Score = {
  score: number;
  numberOfReviews: number;
};
