import { offlineRestAreasApi, restAreasApi } from "@/slices/rest-areas";

export const useScores = (restAreaId: string) => {
  const { isFetching } = restAreasApi.useFetchReviewsForRestAreaQuery(restAreaId);
  const { data } = offlineRestAreasApi.useGetRestAreaScoreQuery(restAreaId);

  const isLoading = !data;

  if (isLoading) {
    return { isFetching, isLoading };
  }
  const { score, numberOfReviews } = data;

  return { score, numberOfReviews, isFetching, isLoading };
};

export const useReviews = (restAreaId: string) => {
  const { isFetching } = restAreasApi.useFetchReviewsForRestAreaQuery(restAreaId);
  const { data: reviews } = offlineRestAreasApi.useGetRestAreaReviewsQuery(restAreaId);

  const isLoading = !reviews;

  if (isLoading) {
    return { isFetching, isLoading };
  }
  return { reviews, isFetching, isLoading };
};
