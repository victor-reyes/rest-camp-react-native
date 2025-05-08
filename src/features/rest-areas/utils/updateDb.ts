import { db, parkings, photos, services } from "@/db";
import { transformToSql } from "../api/transform-to-sql";

export function updateDb(data: Awaited<ReturnType<typeof transformToSql>>) {
  db.transaction(async tx => {
    try {
      await tx.delete(parkings);
      await tx.delete(services);
      await tx.delete(photos);
      await tx.insert(parkings).values(data.parkings);
      await tx.insert(services).values(data.services);
      await tx.insert(photos).values(data.photos);
    } catch (error) {
      console.error("Error inserting data into the database:", error);
    }
  });
}
