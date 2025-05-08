import { EQUIPMENTS, FACILITIES } from "@/features/rest-areas/api";
import { relations } from "drizzle-orm";
import { int, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
  modifiedTime: int({ mode: "number" }).notNull(),
});
export const parkingsRelations = relations(parkings, ({ many }) => ({
  services: many(services),
  photos: many(photos),
}));

export const services = sqliteTable(
  "services",
  {
    name: text({ enum: [...EQUIPMENTS, ...FACILITIES] }).notNull(),
    parkingId: text()
      .notNull()
      .references(() => parkings.id),
  },
  table => [primaryKey({ columns: [table.name, table.parkingId] })],
);
export const servicesRelations = relations(services, ({ one }) => ({
  parking: one(parkings, {
    fields: [services.parkingId],
    references: [parkings.id],
  }),
}));

export const photos = sqliteTable(
  "photos",
  {
    url: text().notNull(),
    description: text(),
    parkingId: text()
      .notNull()
      .references(() => parkings.id),
  },
  table => [primaryKey({ columns: [table.url, table.parkingId] })],
);
export const photosRelations = relations(photos, ({ one }) => ({
  parking: one(parkings, {
    fields: [photos.parkingId],
    references: [parkings.id],
  }),
}));
