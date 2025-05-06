import { EquipmentCategory, FacilityCategory, Parking } from "../schemas";

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

export type Filter = EquipmentCategory | FacilityCategory;
