import { Database } from "@/lib";
import { reviews } from "./schema";

// Database types
export type ReviewSelect = typeof reviews.$inferSelect;
export type ReviewInsert = typeof reviews.$inferInsert;

// Domain types
export type Score = {
  score: number;
  numberOfReviews: number;
};

export type ReviewSubmit = { id?: string; restAreaId: string; score: number; recension?: string };
export type ReviewUpdate = ReviewSubmit & { id: string };

// supabase types
export type ReviewSupaSelect = Database["v1"]["Views"]["reviews"]["Row"];

export type Review = Omit<typeof reviews.$inferSelect, "deleted"> & { isUserReview: boolean };
