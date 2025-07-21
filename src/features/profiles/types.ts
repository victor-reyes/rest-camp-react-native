import { profiles } from "./schema";

// Database types
export type ProfileSelect = typeof profiles.$inferSelect;
export type ProfileInsert = typeof profiles.$inferInsert;

// Domain types
export type Profile = ProfileSelect;

export interface ProfileUpdate {
  id: string;
  fullName?: string;
  avatarUrl?: string;
  location?: string;
}
