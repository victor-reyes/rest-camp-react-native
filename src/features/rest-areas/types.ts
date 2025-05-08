import { parkings, photos, services } from "@/db";
import { z } from "zod";
import { ResponseSchema } from "./api";

export type ParkingPoint = Parking & { type: "Point" };
export type ParkingCluster = {
  type: "Cluster";
  id: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  count: number;
};

export type Filter = (typeof services.$inferSelect)["name"];

export type Parking = typeof parkings.$inferSelect & {
  services: (typeof services.$inferSelect)[];
  photos: (typeof photos.$inferSelect)[];
};

export type Photo = typeof photos.$inferSelect;
export type Service = typeof services.$inferSelect;

export type ParkingResponse = z.infer<typeof ResponseSchema>;
