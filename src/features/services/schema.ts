import { SERVICES } from "../../lib/types";
import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
