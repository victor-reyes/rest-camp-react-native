import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib";
import { offlineReviewsApi } from "./offline-reviews-api";
import { ReviewInsert, ReviewSubmit, ReviewSupaSelect, ReviewUpdate } from "../types";

const DEFAULT_UPDATED_AT = "1970-01-01T00:00:00Z";
const REST_AREA = "RemoteReviewById" as const;

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [REST_AREA],
  endpoints: builder => ({
    fetchReviewsForRestArea: builder.query<null, string>({
      providesTags: (_res, _err, restAreaId) => [{ type: REST_AREA, id: restAreaId }],
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

        const reviews = reviewData.map(toLocalReview);

        if (reviews.length > 0) {
          await dispatch(offlineReviewsApi.endpoints.upsertReviews.initiate(reviews));
        }
        return { data: null };
      },
    }),

    fetchReviewById: builder.query<string, string>({
      providesTags: restAreaId => (restAreaId ? [{ type: REST_AREA, id: restAreaId }] : []),
      queryFn: async (reviewId: string, { dispatch }) => {
        const { data, error } = await supabase.from("reviews").select().eq("id", reviewId).single();
        if (error) return { error };

        const review = toLocalReview(data);
        await dispatch(offlineReviewsApi.endpoints.upsertReviews.initiate([review]));

        return { data: review.restAreaId };
      },
    }),

    submitReview: builder.mutation<null, ReviewSubmit>({
      invalidatesTags: (_res, _err, { restAreaId }) => [{ type: REST_AREA, id: restAreaId }],
      queryFn: async review => {
        const { restAreaId: rest_area_id, score, recension } = review;

        const { error } = await supabase.from("reviews").insert({ rest_area_id, score, recension });

        if (error) return { error };

        return { data: null };
      },
    }),

    updateReview: builder.mutation<null, ReviewUpdate>({
      invalidatesTags: (_res, _err, { restAreaId }) => [{ type: REST_AREA, id: restAreaId }],
      queryFn: async review => {
        const { id, score, recension } = review;
        const { error } = await supabase
          .from("reviews")
          .update({ score, recension, updated_at: new Date().toISOString() })
          .eq("id", id);

        if (error) return { error };

        return { data: null };
      },
    }),
  }),
});

export const { useFetchReviewsForRestAreaQuery, useSubmitReviewMutation } = reviewsApi;

function toLocalReview(review: ReviewSupaSelect): Required<ReviewInsert> {
  return {
    id: review.id,
    restAreaId: review.rest_area_id,
    ownerId: review.owner_id,
    score: review.score,
    recension: review.recension || null,
    updatedAt: new Date(review.updated_at!).getTime(),
    deleted: review.deleted || false,
  };
}
