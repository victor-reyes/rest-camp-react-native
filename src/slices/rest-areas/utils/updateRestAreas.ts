import { db, restAreas, photos, services } from "@/db";
import { PhotoInsert, RestAreaInsert, ServiceInsert } from "../types";
import { inArray } from "drizzle-orm";

export async function updateRestAreas(data: {
  restAreas: RestAreaInsert[];
  services: ServiceInsert[];
  photos: PhotoInsert[];
}) {
  return await db.transaction(async tx => {
    try {
      const [restAreaIds, servicesIds, photosUrls] = [
        data.restAreas.map(r => r.id),
        data.services.map(s => s.restAreaId),
        data.photos.map(p => p.url),
      ];
      await tx.delete(restAreas).where(inArray(restAreas.id, restAreaIds));
      await tx.delete(services).where(inArray(services.restAreaId, servicesIds));
      await tx.delete(photos).where(inArray(photos.url, photosUrls));

      if (data.restAreas.length > 0) await tx.insert(restAreas).values(data.restAreas);
      if (data.services.length > 0) await tx.insert(services).values(data.services);
      if (data.photos.length > 0) await tx.insert(photos).values(data.photos);
      return { error: null };
    } catch (error) {
      console.error("Error inserting data into the database:", error);
      return { error };
    }
  });
}
