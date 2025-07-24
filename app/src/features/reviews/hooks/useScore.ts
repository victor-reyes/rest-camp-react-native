import { reviewsApi, offlineReviewsApi } from "../api";

export const useScore = (restAreaId: string) => {
  const { isFetching } = reviewsApi.useFetchReviewsForRestAreaQuery(restAreaId);
  const { data } = offlineReviewsApi.useGetRestAreaScoreQuery(restAreaId);

  const isLoading = !data;

  if (isLoading) {
    return { isFetching, isLoading };
  }
  const { score, numberOfReviews } = data;

  return { score, numberOfReviews, isFetching, isLoading };
};
