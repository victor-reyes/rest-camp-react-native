import { useMemo } from "react";
import { offlineReviewsApi, reviewsApi } from "../api";
import { Review } from "../types";

export const useReviews = (restAreaId: string, userId?: string) => {
  const { isFetching } = reviewsApi.useFetchReviewsForRestAreaQuery(restAreaId);
  const { data = [], isLoading } = offlineReviewsApi.useGetRestAreaReviewsQuery(restAreaId);

  const reviews: Review[] = useMemo(
    () =>
      data
        .map(review => ({ ...review, isUserReview: review.ownerId === userId }))
        .sort((reviewA, reviewB) => {
          if (reviewA.isUserReview) return -1;
          if (reviewB.isUserReview) return 1;
          return reviewA.updatedAt - reviewB.updatedAt;
        }),
    [data, userId],
  );

  return isLoading ? { reviews, isFetching, isLoading } : { reviews, isFetching, isLoading };
};

export function useReview(reviewId?: string) {
  if (reviewId) {
    reviewsApi.useFetchReviewByIdQuery(reviewId);
    const { review, isLoading } = offlineReviewsApi.useGetReviewQuery(reviewId, {
      selectFromResult: ({ data, isLoading }) => ({
        review: data ? { ...data, recension: data.recension || undefined } : undefined,
        isLoading,
      }),
    });
    return { review, isLoading };
  }
  return { isLoading: false };
}
