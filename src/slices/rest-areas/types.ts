import { restAreas, photos, services } from "@/db";

export type RestAreaPoint = RestArea & { type: "Point" };
export type RestAreaCluster = {
  type: "Cluster";
  id: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  count: number;
};

export type Filter = Service;

export type RestArea = typeof restAreas.$inferSelect & {
  services: (typeof services.$inferSelect)[];
  photos: (typeof photos.$inferSelect)[];
};
export type Status = RestArea["status"];

export type Photo = typeof photos.$inferSelect;
export type ServiceSelect = typeof services.$inferSelect;
export type Service = ServiceSelect["name"];

export type RestAreaInsert = typeof restAreas.$inferInsert;
export type ServiceInsert = typeof services.$inferInsert;
export type PhotoInsert = typeof photos.$inferInsert;
