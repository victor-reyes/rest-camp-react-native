import type { Database } from "./database.types.ts";

export type Photo = Database["public"]["Tables"]["photos"]["Insert"];
export type Service = Database["public"]["Tables"]["services"]["Insert"];
export type RestArea = Database["public"]["Tables"]["rest_areas"]["Insert"];
export type Review = Database["public"]["Tables"]["reviews"]["Insert"];
export type RestAreaWithInfo = RestArea & {
  services: Service[];
  photos: Photo[];
  reviews: Review[];
};
