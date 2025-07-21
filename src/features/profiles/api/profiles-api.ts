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
    fetchProfiles: builder.query({
      queryFn: async (profileIds: string[], { dispatch }) => {
        if (profileIds.length === 0) {
          return { data: null };
        }

        const { data: profileData, error: fetchError } = await supabase
          .from("profiles")
          .select()
          .in("id", profileIds);

        if (fetchError) return { error: fetchError };

        const profiles: ProfileInsert[] = profileData.map(profile => ({
          id: profile.id!,
          fullName: profile.full_name,
          avatarUrl: profile.avatar_url,
          location: profile.location,
          updatedAt: new Date(profile.updated_at!).getTime(),
        }));

        if (profiles.length > 0) {
          await dispatch(offlineProfilesApi.endpoints.upsertProfiles.initiate(profiles));
        }

        return { data: null };
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

export const { useFetchProfilesQuery, useUpdateProfileMutation } = profilesApi;
