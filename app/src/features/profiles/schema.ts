import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profiles = sqliteTable("profiles", {
  id: text().primaryKey(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  location: text("location"),
  updatedAt: int("updated_at", { mode: "number" }).notNull(),
});
