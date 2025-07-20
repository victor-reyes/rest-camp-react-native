import { offlineReviewsApi, reviewsApi } from "../api";

export const useReviews = (restAreaId: string) => {
  const { isFetching } = reviewsApi.useFetchReviewsForRestAreaQuery(restAreaId);
  const { data: reviews } = offlineReviewsApi.useGetRestAreaReviewsQuery(restAreaId);

  const isLoading = !reviews;

  if (isLoading) {
    return { isFetching, isLoading };
  }
  return { reviews, isFetching, isLoading };
};
