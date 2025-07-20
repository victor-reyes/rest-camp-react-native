import { services } from "./schema";

// Database types
export type ServiceSelect = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;

// Domain types
export type Service = ServiceSelect["name"];
export type Filter = Service;
