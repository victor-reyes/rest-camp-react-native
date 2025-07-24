import { STATUSES } from "../../lib/types";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
