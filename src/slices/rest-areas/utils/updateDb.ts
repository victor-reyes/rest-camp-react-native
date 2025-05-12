import { db, restAreas, photos, services } from "@/db";
import { transformToSql } from "../api/transform-to-sql";

export async function updateDb(data: Awaited<ReturnType<typeof transformToSql>>) {
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
