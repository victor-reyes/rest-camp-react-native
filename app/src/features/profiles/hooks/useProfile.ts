import { useFetchProfileQuery, useGetProfileQuery } from "../api";

export function useProfile(profileId: string) {
  const { isLoading: isFetching, isError } = useFetchProfileQuery(profileId);

  const { data: profile, isLoading } = useGetProfileQuery(profileId);

  return {
    profile,
    isLoading: profile ? isLoading : isFetching || isLoading,
    isError,
  };
}
