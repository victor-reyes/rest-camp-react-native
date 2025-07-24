import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib";
import { offlineReviewsApi } from "./offline-reviews-api";
import { ReviewInsert } from "../types";

const DEFAULT_UPDATED_AT = "1970-01-01T00:00:00Z";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Reviews"],
  endpoints: builder => ({
    fetchReviewsForRestArea: builder.query({
      queryFn: async (restAreaId: string, { dispatch }) => {
        const { data } = await dispatch(
          offlineReviewsApi.endpoints.getLatestReviewUpdatedAtByRestArea.initiate(restAreaId),
        );
        const updatedAt = data ? new Date(data).toISOString() : DEFAULT_UPDATED_AT;

        const { data: reviewData, error: fetchError } = await supabase
          .from("reviews")
          .select()
          .gt("updated_at", updatedAt);

        if (fetchError) return { error: fetchError };

        const reviews: Required<ReviewInsert>[] = reviewData.map(review => ({
          id: review.id,
          restAreaId: review.rest_area_id,
          ownerId: review.owner_id,
          score: review.score,
          recension: review.recension,
          updatedAt: new Date(review.updated_at!).getTime(),
          deleted: review.deleted,
        }));

        if (reviews.length > 0) {
          await dispatch(offlineReviewsApi.endpoints.upsertReviews.initiate(reviews));
        }
        return { data: null };
      },
    }),
  }),
});

export const { useFetchReviewsForRestAreaQuery } = reviewsApi;
