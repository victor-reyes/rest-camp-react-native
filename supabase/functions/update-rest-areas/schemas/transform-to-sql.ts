import { z } from "zod";
import { Database } from "../database.types.ts";
import { ResponseSchema } from "./index.ts";

export function transformToSql(raw: unknown) {
  const responce = ResponseSchema.parse(raw);
  const data = responce.RESPONSE.RESULT[0].Parking || [];

  const restAreas: RestArea[] = data.map((item): RestArea => {
    const localDescription = [item.LocationDescription, item.DistanceToNearestCity]
      .filter(Boolean)
      .join(" ");
    return {
      trafikverket_id: item.Id,
      name: item.Name,
      latitude: item.Geometry.latitude,
      longitude: item.Geometry.longitude,
      description: item.Description,
      local_description: localDescription,
      status: item.OpenStatus,
      updated_at: item.ModifiedTime,
      services: [...item.Equipment, ...(item.Facility || [])].map(service => ({
        name: service.Type,
      })),
      photos: (item.Photo || []).map(photo => ({
        url: photo.Url,
        description: photo.Title,
        thumbnail_url: photo.Url,
      })),
    };
  });

  return restAreas;
}

export type RestAreaApiResponse = z.infer<typeof ResponseSchema>;

type Photo = Omit<Database["public"]["Tables"]["photos"]["Insert"], "rest_area_id">;
type Service = Omit<Database["public"]["Tables"]["services"]["Insert"], "rest_area_id">;
type RestArea = Database["public"]["Tables"]["rest_areas"]["Insert"] & {
  services: Service[];
  photos: Photo[];
};
