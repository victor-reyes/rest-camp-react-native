import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib";
import { offlinePhotosApi } from "./offline-photos-api";
import { PhotoInsert } from "../types";
import { compressImageToBuffer } from "@/lib/utils";
import { FileOptions } from "@supabase/storage-js/src/lib/types";
import { CompressorOptions } from "react-native-compressor/lib/typescript/Image";

const DEFAULT_UPDATED_AT = "1970-01-01T00:00:00Z";
const INSERT_OPTIONS: FileOptions = { cacheControl: "31536000", contentType: "image/jpeg" };
const FULL_COMPRESS_OPTIONS: CompressorOptions = { maxWidth: 1200, quality: 0.7 };
const THUMBNAIL_COMPRESS_OPTIONS: CompressorOptions = { maxWidth: 400, quality: 0.7 };

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["FetchPhotos"],
  endpoints: builder => ({
    fetchPhotos: builder.query<null, void>({
      providesTags: ["FetchPhotos"],
      queryFn: async (_, { dispatch }) => {
        const { data } = await dispatch(
          offlinePhotosApi.endpoints.getLatestPhotoUpdatedAt.initiate(),
        );

        const updatedAt = data ? new Date(data).toISOString() : DEFAULT_UPDATED_AT;

        const [{ data: photoData, error: fetchError }] = await Promise.all([
          supabase.from("photos").select().gt("updated_at", updatedAt),
        ]);

        if (fetchError) return { error: fetchError };

        const photos: PhotoInsert[] = photoData.map(photo => ({
          url: photo.url,
          thumbnailUrl: photo.thumbnail_url,
          description: photo.description,
          restAreaId: photo.rest_area_id,
          updatedAt: new Date(photo.updated_at).getTime(),
          deleted: photo.deleted,
        }));

        if (photos.length > 0) {
          console.log(`# of photos: ${photos.length}`);
          await dispatch(offlinePhotosApi.endpoints.upsertPhotos.initiate(photos));
        }
        return { data: null };
      },
    }),
    uploadPhoto: builder.mutation<null, { restAreaId: string; uri: string; description?: string }>({
      invalidatesTags: ["FetchPhotos"],
      queryFn: async ({ restAreaId, uri, description }) => {
        const path = `${restAreaId}-${Date.now()}.jpeg`;

        const { storage } = supabase;
        const [photoResponse, thumbnailResponse] = await Promise.all([
          compressImageToBuffer(uri, FULL_COMPRESS_OPTIONS).then(res =>
            storage.from("photos").upload(path, res, INSERT_OPTIONS),
          ),
          compressImageToBuffer(uri, THUMBNAIL_COMPRESS_OPTIONS).then(res =>
            storage.from("photos").upload(`thumbnails-${path}`, res, INSERT_OPTIONS),
          ),
        ]);

        if (photoResponse.error || thumbnailResponse.error) {
          console.error("Storage upload error:", photoResponse.error || thumbnailResponse.error);
          return { error: photoResponse.error || thumbnailResponse.error };
        }

        const [url, thumbnailUrl] = [photoResponse, thumbnailResponse].map(
          res => storage.from("photos").getPublicUrl(res.data.path).data.publicUrl,
        );

        const { error: insertError } = await supabase.from("photos").insert({
          rest_area_id: restAreaId,
          url,
          thumbnail_url: thumbnailUrl,
          description: description,
        });

        if (insertError) {
          console.error("Database insert error:", insertError);
          return { error: insertError };
        }

        return { data: null };
      },
    }),
  }),
});

export const { useFetchPhotosQuery, useUploadPhotoMutation } = photosApi;
