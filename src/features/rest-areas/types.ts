import { parkings, photos, services } from "@/db";

export type ParkingPoint = ParkingItem & { type: "Point" };
export type ParkingCluster = {
  type: "Cluster";
  id: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  count: number;
};

export type Filter = typeof services.$inferSelect["name"];

export type ParkingItem = typeof parkings.$inferSelect & {
  services: (typeof services.$inferSelect)[];
  photos: (typeof photos.$inferSelect)[];
};
