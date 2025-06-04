import z from "zod";
import { Database } from "./database.types.ts";
import { ResponseSchema } from "./api/index.ts";

export type RestAreaApiResponse = z.infer<typeof ResponseSchema>;

export type Photo = Omit<Database["public"]["Tables"]["photos"]["Insert"], "rest_area_id">;
export type Service = Omit<Database["public"]["Tables"]["services"]["Insert"], "rest_area_id">;
export type RestArea = Database["public"]["Tables"]["rest_areas"]["Insert"];
export type RestAreaWithServicesAndPhotos = RestArea & {
  services: Service[];
  photos: Photo[];
};
