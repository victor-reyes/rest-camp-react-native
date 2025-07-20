import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
