import { photos } from "./schema";

// Database types
export type PhotoSelect = typeof photos.$inferSelect;
export type PhotoInsert = typeof photos.$inferInsert;

// Domain types
export type Photo = Omit<PhotoSelect, "deleted">;
