import { EQUIPMENTS, FACILITIES } from "@/features/rest-areas/api";
import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const parkings = sqliteTable("parkings", {
  id: text().primaryKey(),
  name: text().notNull(),
  latitude: real().notNull(),
  longitude: real().notNull(),
  description: text(),
  localDescription: text(),
  status: text().notNull(),
  numberOfCarSpaces: int(),
  numberOfTruckSpaces: int(),
});
export const parkingsRelations = relations(parkings, ({ many }) => ({
  services: many(services),
  photos: many(photos),
}));

export const services = sqliteTable("services", {
  id: text()
    .primaryKey()
    .$defaultFn(() => v4()),
  name: text({ enum: [...EQUIPMENTS, ...FACILITIES] }).notNull(),
  parkingId: int().references(() => parkings.id),
});
export const servicesRelations = relations(services, ({ one }) => ({
  parking: one(parkings, {
    fields: [services.parkingId],
    references: [parkings.id],
  }),
}));

export const photos = sqliteTable("photos", {
  url: text().primaryKey(),
  description: text(),
  parkingId: int().references(() => parkings.id),
});
export const photosRelations = relations(photos, ({ one }) => ({
  parking: one(parkings, {
    fields: [photos.parkingId],
    references: [parkings.id],
  }),
}));
