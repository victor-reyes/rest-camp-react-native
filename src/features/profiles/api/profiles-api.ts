import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib";
import { offlineProfilesApi } from "./offline-profiles-api";
import { ProfileInsert, ProfileSupaUpdate, ProfileUpdate } from "../types";
import { compressImageToBuffer } from "@/lib/utils";
import { FileOptions } from "@supabase/storage-js/src/lib/types";
import { CompressorOptions } from "react-native-compressor/lib/typescript/Image";

const DEFAULT_UPDATED_AT = "1970-01-01T00:00:00Z";
const TAG_PROFILE = "Profiles";

const INSERT_OPTIONS: FileOptions = { cacheControl: "31536000", contentType: "image/jpeg" };
const COMPRESS_OPTIONS: CompressorOptions = { maxWidth: 400, quality: 0.7 };

export const profilesApi = createApi({
  reducerPath: "profilesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [TAG_PROFILE],
  endpoints: builder => ({
    uploadAvatar: builder.mutation<string, { uri: string; userId: string }>({
      queryFn: async ({ uri, userId }) => {
        try {
          const path = `avatar-${userId}-${Date.now()}.jpeg`;

          // simulate delay for image compression
          await new Promise(resolve => setTimeout(resolve, 5000));
          const compressedImage = await compressImageToBuffer(uri, COMPRESS_OPTIONS);

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(path, compressedImage, INSERT_OPTIONS);

          if (uploadError) {
            console.error("Avatar upload Supabase error:", uploadError);
            return { error: uploadError };
          }

          const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);

          return { data: urlData.publicUrl };
        } catch (error) {
          console.error("Avatar upload failed:", error);
          return { error: { message: "Failed to upload avatar" } };
        }
      },
    }),

    fetchProfile: builder.query({
      providesTags: (_res, _err, id) => [{ type: TAG_PROFILE, id: id }],
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

    updateProfile: builder.mutation<null, { id: string; profile: ProfileUpdate }>({
      queryFn: async ({ id, profile }, { dispatch }) => {
        const updateWithTimestamp: ProfileSupaUpdate = {
          full_name: profile.fullName,
          avatar_url: profile.avatarUrl,
          updated_at: new Date().toISOString(),
        };

        const { data: profileData, error: updateError } = await supabase
          .from("profiles")
          .update(updateWithTimestamp)
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
      invalidatesTags: (_res, _err, { id }) => [{ type: TAG_PROFILE, id }],
    }),
  }),
});

export const { useFetchProfileQuery, useUpdateProfileMutation, useUploadAvatarMutation } =
  profilesApi;
