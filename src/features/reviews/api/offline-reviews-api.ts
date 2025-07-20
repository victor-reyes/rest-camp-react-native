import { client } from "@/db";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { sql } from "drizzle-orm";
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
                set: {
                  score: sql.raw(`excluded.${reviews.score.name}`),
                  recension: sql.raw(`excluded.${reviews.recension.name}`),
                  ownerId: sql.raw(`excluded.${reviews.ownerId.name}`),
                  updatedAt: sql.raw(`excluded.${reviews.updatedAt.name}`),
                  deleted: sql.raw(`excluded.${reviews.deleted.name}`),
                },
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
  useGetRestAreaReviewsQuery,
  useGetRestAreaScoreQuery,
  useUpsertReviewsMutation,
  useGetLatestReviewUpdatedAtByRestAreaQuery,
} = offlineReviewsApi;
