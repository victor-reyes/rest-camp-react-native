import { Database } from "@/lib";
import { profiles } from "./schema";

// Database types
export type ProfileSelect = typeof profiles.$inferSelect;
export type ProfileInsert = typeof profiles.$inferInsert;
export type ProfileUpdate = Omit<ProfileInsert & { fullName: string }, "updatedAt">;

// Domain types
export type Profile = ProfileSelect;

// Supabase types
export type ProfileSupaUpdate = Database["v1"]["Views"]["profiles"]["Update"];
