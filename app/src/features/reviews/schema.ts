import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reviews = sqliteTable("reviews", {
  id: text().primaryKey(),
  restAreaId: text("rest_area_id").notNull(),
  ownerId: text("owner_id").notNull(),
  score: int().notNull(),
  recension: text(),
  updatedAt: int("updated_at", { mode: "number" }).notNull(),
  deleted: int("deleted", { mode: "boolean" }).notNull(),
});
