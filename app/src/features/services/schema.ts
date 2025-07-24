import { SERVICES } from "../../lib/types";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  name: text({ enum: SERVICES }).notNull(),
  restAreaId: text("rest_area_id").notNull(),
  updatedAt: int("updated_at", { mode: "number" }).notNull(),
  deleted: int("deleted", { mode: "boolean" }).notNull(),
});
