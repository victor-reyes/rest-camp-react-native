import { reviews } from "./schema";

// Database types
export type ReviewSelect = typeof reviews.$inferSelect;
export type ReviewInsert = typeof reviews.$inferInsert;

// Domain types
export type Score = {
  score: number;
  numberOfReviews: number;
};
