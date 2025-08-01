import { client, conflictUpdateAllExcept } from "@/db";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { reviews } from "../schema";
import { ReviewInsert, Score } from "../types";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";

const db = drizzle(client, { schema: { reviews } });
export const offlineReviewsApi = createApi({
  reducerPath: "offlineReviewsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Reviews"],
  endpoints: builder => ({
    getRestAreaReviews: builder.query({
      providesTags: ["Reviews"],
      queryFn: async (restAreaId: string) => {
        const data = await db.query.reviews.findMany({
          where: (table, { and, eq }) =>
            and(eq(table.restAreaId, restAreaId), eq(table.deleted, false)),
        });
        return { data };
      },
    }),

    getReview: builder.query({
      providesTags: ["Reviews"],
      queryFn: async (reviewId: string) => {
        const data = await db.query.reviews.findFirst({
          where: (table, { eq }) => eq(table.id, reviewId),
        });
        return { data };
      },
    }),

    getRestAreaScore: builder.query<Score, string>({
      providesTags: ["Reviews"],
      queryFn: async (restAreaId: string) => {
        const data = await db.query.reviews.findMany({
          columns: { score: true },
          where: (table, { and, eq }) =>
            and(eq(table.restAreaId, restAreaId), eq(table.deleted, false)),
        });
        const average =
          data.length > 0 ? data.reduce((sum, review) => sum + review.score, 0) / data.length : 0;
        return { data: { score: average, numberOfReviews: data.length } };
      },
    }),

    upsertReviews: builder.mutation<null, ReviewInsert[]>({
      queryFn: async (newReviews: ReviewInsert[]) => {
        try {
          await db.transaction(async tx => {
            await tx
              .insert(reviews)
              .values(newReviews)
              .onConflictDoUpdate({
                target: [reviews.id],
                set: conflictUpdateAllExcept(reviews, ["id"]),
              });
          });
          return { data: null };
        } catch (error) {
          console.error("Failed to upsert reviews:", error);
          return { error: { data: "Failed to upsert reviews" } };
        }
      },
      invalidatesTags: ["Reviews"],
    }),

    getLatestReviewUpdatedAtByRestArea: builder.query<number, string>({
      providesTags: ["Reviews"],
      queryFn: async (restAreaId: string) => {
        const data = await db.query.reviews.findFirst({
          columns: { updatedAt: true },
          where: (table, { eq }) => eq(table.restAreaId, restAreaId),
          orderBy: (table, { desc }) => desc(table.updatedAt),
        });
        const latestUpdatedAt = data?.updatedAt || 0;
        return { data: latestUpdatedAt };
      },
    }),
  }),
});

export const {
  useGetReviewQuery,
  useGetRestAreaReviewsQuery,
  useGetRestAreaScoreQuery,
  useUpsertReviewsMutation,
  useGetLatestReviewUpdatedAtByRestAreaQuery,
} = offlineReviewsApi;
