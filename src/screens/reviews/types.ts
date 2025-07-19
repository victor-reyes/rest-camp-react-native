import { reviews } from "@/db";

export type Review = Omit<typeof reviews.$inferSelect, "deleted">;
