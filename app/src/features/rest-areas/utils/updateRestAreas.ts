import { client } from "@/db";
import { RestAreaInsert, ServiceInsert } from "../types";
import { PhotoInsert } from "@/features/photos";
import { inArray } from "drizzle-orm";
import { photos } from "@/features/photos/schema";
import { services } from "@/features/services/schema";
import { restAreas } from "../schema";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";

const db = drizzle(client);

export async function updateRestAreas(data: {
  restAreas: (RestAreaInsert & { deleted: boolean })[];
  services: (ServiceInsert & { deleted: boolean })[];
  photos: (PhotoInsert & { deleted: boolean })[];
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

      const [restAreasToInsert, servicesToInsert, photosToInsert] = [
        data.restAreas.filter(r => !r.deleted),
        data.services.filter(s => !s.deleted),
        data.photos.filter(p => !p.deleted),
      ];

      if (restAreasToInsert.length > 0) await tx.insert(restAreas).values(restAreasToInsert);
      if (servicesToInsert.length > 0) await tx.insert(services).values(servicesToInsert);
      if (photosToInsert.length > 0) await tx.insert(photos).values(photosToInsert);
      return { error: null };
    } catch (error) {
      console.error("Error inserting data into the database:", error);
      return { error };
    }
  });
}
