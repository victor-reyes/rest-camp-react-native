import { SERVICES, STATUSES } from "@/lib/types";
import { relations } from "drizzle-orm";
import { int, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const restAreas = sqliteTable("rest_areas", {
  id: text().primaryKey(),
  name: text().notNull(),
  latitude: real().notNull(),
  longitude: real().notNull(),
  description: text(),
  localDescription: text("local_description"),
  status: text({ enum: STATUSES }).notNull(),
  updatedAt: int("updated_at", { mode: "number" }).notNull(),
  deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
});
export const restAreaRelations = relations(restAreas, ({ many }) => ({
  services: many(services),
  photos: many(photos),
}));

export const services = sqliteTable(
  "services",
  {
    name: text({ enum: SERVICES }).notNull(),
    restAreaId: text("rest_area_id").notNull(),
    updatedAt: int("updated_at", { mode: "number" }).notNull(),
    deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
  },
  table => [primaryKey({ columns: [table.name, table.restAreaId] })],
);
export const servicesRelations = relations(services, ({ one }) => ({
  restArea: one(restAreas, {
    fields: [services.restAreaId],
    references: [restAreas.id],
  }),
}));

export const photos = sqliteTable(
  "photos",
  {
    url: text().notNull(),
    thumbnailUrl: text("thumbnail_url").notNull(),
    description: text(),
    restAreaId: text("rest_area_id").notNull(),
    updatedAt: int("updated_at", { mode: "number" }).notNull(),
    deleted: int("deleted", { mode: "boolean" }).notNull().default(false),
  },
  table => [primaryKey({ columns: [table.url, table.restAreaId] })],
);
export const photosRelations = relations(photos, ({ one }) => ({
  restArea: one(restAreas, {
    fields: [photos.restAreaId],
    references: [restAreas.id],
  }),
}));
