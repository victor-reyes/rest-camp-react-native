import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib";
import { offlineProfilesApi } from "./offline-profiles-api";
import { ProfileInsert, ProfileUpdate } from "../types";

const DEFAULT_UPDATED_AT = "1970-01-01T00:00:00Z";

export const profilesApi = createApi({
  reducerPath: "profilesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Profiles"],
  endpoints: builder => ({
    fetchProfile: builder.query({
      queryFn: async (profileId: string, { dispatch }) => {
        const { data } = await dispatch(
          offlineProfilesApi.endpoints.getProfileLatestUpdate.initiate(profileId),
        );
        const updatedAt = data ? new Date(data).toISOString() : DEFAULT_UPDATED_AT;
        const { data: profileData, error: fetchError } = await supabase
          .from("profiles")
          .select()
          .eq("id", profileId)
          .gt("updated_at", updatedAt)
          .maybeSingle();

        if (fetchError) return { error: fetchError };

        const profile: ProfileInsert | null =
          profileData ?
            {
              id: profileData.id,
              fullName: profileData.full_name,
              avatarUrl: profileData.avatar_url,
              location: profileData.location,
              updatedAt: new Date(profileData.updated_at).getTime(),
            }
          : null;

        if (profile)
          await dispatch(offlineProfilesApi.endpoints.upsertProfiles.initiate([profile]));

        return { data: profile };
      },
    }),

    updateProfile: builder.mutation<null, ProfileUpdate>({
      queryFn: async ({ id, ...updates }, { dispatch }) => {
        const updateData: any = {};

        if (updates.fullName !== undefined) {
          updateData.full_name = updates.fullName;
        }
        if (updates.avatarUrl !== undefined) {
          updateData.avatar_url = updates.avatarUrl;
        }
        if (updates.location !== undefined) {
          updateData.location = updates.location;
        }

        const { data: profileData, error: updateError } = await supabase
          .from("profiles")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (updateError) return { error: updateError };

        // Update local cache with the updated profile
        const updatedProfile: ProfileInsert = {
          id: profileData.id!,
          fullName: profileData.full_name,
          avatarUrl: profileData.avatar_url,
          location: profileData.location,
          updatedAt: new Date(profileData.updated_at!).getTime(),
        };

        await dispatch(offlineProfilesApi.endpoints.upsertProfiles.initiate([updatedProfile]));

        return { data: null };
      },
      invalidatesTags: ["Profiles"],
    }),
  }),
});

export const { useFetchProfileQuery, useUpdateProfileMutation } = profilesApi;
