import { Database } from "@/lib";
import { profiles } from "./schema";

// Database types
export type ProfileSelect = typeof profiles.$inferSelect;
export type ProfileInsert = typeof profiles.$inferInsert;

// Domain types
export type Profile = ProfileSelect;
export type ProfileUpdate = Partial<Omit<ProfileInsert, "id" | "updatedAt">>;

// Supabase types
export type ProfileSupaUpdate = Database["v1"]["Views"]["profiles"]["Update"];
