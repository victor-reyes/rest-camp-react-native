import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib";
import { Image } from "react-native-compressor";
import { CompressorOptions } from "react-native-compressor/lib/typescript/Image";
import { offlineRestAreasApi, RestAreasWithServices } from "./offline-rest-areas-api";
import { PhotoInsert, ReviewInsert } from "../types";

const DEFAULT_UPDATED_AT = "1970-01-01T00:00:00Z";

export const restAreasApi = createApi({
  reducerPath: "restAreasApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RestAreas", "FetchPhotos"],
  endpoints: builder => ({
    fetchRestAreasWithServices: builder.query<null, void>({
      providesTags: ["RestAreas"],
      queryFn: async (_, { dispatch }) => {
        const { data } = await dispatch(
          offlineRestAreasApi.endpoints.getLatestRestAreaUpdatedAt.initiate(),
        );
        const updatedAt = data ? new Date(data).toISOString() : DEFAULT_UPDATED_AT;

        console.log(`Last updated at: ${updatedAt}`);
        const { data: restAreasWithServices, error: fetchError } = await supabase
          .from("rest_areas_with_services")
          .select()
          .gt("updated_at", updatedAt);

        if (fetchError) return { error: fetchError };

        const restAreas: RestAreasWithServices = {
          restAreas: restAreasWithServices.map(restArea => ({
            id: restArea.id,
            name: restArea.name || "",
            latitude: restArea.latitude,
            longitude: restArea.longitude,
            description: restArea.description || "",
            localDescription: restArea.local_description || "",
            status: restArea.status,
            numberOfCarSpaces: 0,
            numberOfTruckSpaces: 0,
            updatedAt: new Date(restArea.updated_at).getTime(),
            deleted: restArea.deleted,
          })),
          services: restAreasWithServices.flatMap(restArea =>
            restArea.services.map(service => ({
              name: service.name,
              restAreaId: service.rest_area_id,
              updatedAt: new Date(restArea.updated_at).getTime(),
              deleted: restArea.deleted,
            })),
          ),
        };

        if (restAreas.restAreas.length > 0) {
          console.log(`# of rest areas: ${restAreas.restAreas.length}`);

          await dispatch(
            offlineRestAreasApi.endpoints.upsertRestAreasWithServices.initiate(restAreas),
          );
        }

        return { data: null };
      },
    }),
    fetchPhotos: builder.query<null, void>({
      providesTags: ["FetchPhotos"],
      queryFn: async (_, { dispatch }) => {
        const { data } = await dispatch(
          offlineRestAreasApi.endpoints.getLatestPhotoUpdatedAt.initiate(),
        );

        const updatedAt = data ? new Date(data).toISOString() : DEFAULT_UPDATED_AT;
        console.log(`Last photo updated at: ${updatedAt}`);

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
          await dispatch(offlineRestAreasApi.endpoints.upsertPhotos.initiate(photos));
        }
        return { data: null };
      },
    }),
    uploadPhoto: builder.mutation<null, { restAreaId: string; uri: string; description?: string }>({
      invalidatesTags: ["FetchPhotos"],
      queryFn: async ({ restAreaId, uri, description }) => {
        const path = `${restAreaId}-${Date.now()}.jpeg`;
        const options = { contentType: "image/jpeg" };

        const { storage } = supabase;
        const [photoResponse, thumbnailResponse] = await Promise.all([
          compressImageToBuffer(uri, { maxWidth: 1200, quality: 0.7 }).then(res =>
            storage.from("photos").upload(path, res, options),
          ),
          compressImageToBuffer(uri, { maxWidth: 400, quality: 0.7 }).then(res =>
            storage.from("photos").upload(`thumbnails-${path}`, res, options),
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
    fetchReviewsForRestArea: builder.query({
      queryFn: async (restAreaId: string, { dispatch }) => {
        const { data } = await dispatch(
          offlineRestAreasApi.endpoints.getLatestReviewUpdatedAtByRestArea.initiate(restAreaId),
        );
        const updatedAt = data ? new Date(data).toISOString() : DEFAULT_UPDATED_AT;

        const { data: reviewData, error: fetchError } = await supabase
          .from("reviews_with_profiles")
          .select()
          .gt("updated_at", updatedAt);

        if (fetchError) return { error: fetchError };

        const reviews: Required<ReviewInsert>[] = reviewData.map(review => ({
          id: review.id,
          restAreaId: review.rest_area_id,
          user: { fullName: review.full_name || "", avatarUrl: review.avatar_url || "" },
          score: review.score,
          recension: review.recension,
          updatedAt: new Date(review.updated_at!).getTime(),
          deleted: review.deleted,
        }));

        if (reviews.length > 0) {
          await dispatch(offlineRestAreasApi.endpoints.upsertReviews.initiate(reviews));
        }
        return { data: null };
      },
    }),
  }),
});

async function compressImageToBuffer(uri: string, options: CompressorOptions) {
  const compressedUri = await Image.compress(uri, options);
  return fetch(compressedUri).then(res => res.arrayBuffer());
}

export const { useFetchRestAreasWithServicesQuery, useFetchPhotosQuery, useUploadPhotoMutation } =
  restAreasApi;
