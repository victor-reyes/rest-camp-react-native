import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const parkings = sqliteTable("parkings", {
  id: int().primaryKey().notNull(),
  name: text().notNull(),
  latitude: real().notNull(),
  longitude: real().notNull(),
  info: text(),
  status: text().notNull(),
  numberOfCarSpaces: int(),
  numberOfTruckSpaces: int(),
});

export const services = sqliteTable("services", {
  id: int().primaryKey().notNull(),
  name: text().notNull(),
  parkingId: int().references(() => parkings.id),
});

export const photos = sqliteTable("photos", {
  id: int().primaryKey().notNull(),
  url: text().notNull(),
  description: text(),
  parkingId: int().references(() => parkings.id),
});
