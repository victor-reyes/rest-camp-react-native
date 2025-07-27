import { reviews } from "@/features/reviews/schema";

export type Review = Omit<typeof reviews.$inferSelect, "deleted"> & { isUserReview: boolean };
