import { db, restAreas, photos, services } from "@/db";
import { PhotoInsert, RestAreaInsert, ServiceInsert } from "../types";

export async function updateDb(data: {
  restAreas: RestAreaInsert[];
  services: ServiceInsert[];
  photos: PhotoInsert[];
}) {
  await db.transaction(async tx => {
    try {
      await tx.delete(restAreas);
      await tx.delete(services);
      await tx.delete(photos);
      await tx.insert(restAreas).values(data.restAreas);
      await tx.insert(services).values(data.services);
      await tx.insert(photos).values(data.photos);
    } catch (error) {
      console.error("Error inserting data into the database:", error);
    }
  });
}
