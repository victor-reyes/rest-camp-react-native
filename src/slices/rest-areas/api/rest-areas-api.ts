import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateRestAreas } from "../utils";
import { loadRestAreas } from "../rest-area-slice";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native-compressor";
import { CompressorOptions } from "react-native-compressor/lib/typescript/Image";

export const restAreasApi = createApi({
  reducerPath: "restAreasApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RestAreas"],
  endpoints: builder => ({
    restAreas: builder.query<Parameters<typeof updateRestAreas>[0] & { checkedAt: string }, void>({
      providesTags: ["RestAreas"],
      queryFn: async () => {
        const checkedAt = new Date().toISOString();

        const lastChecked = (await AsyncStorage.getItem("lastCheckedAt")) || "1970-01-01T00:00:00Z";

        const [
          { data: restAreasWithServices, error: restAreaError },
          { data: photos, error: photosError },
        ] = await Promise.all([
          supabase.from("rest_areas").select("*, services(*)").gte("updated_at", lastChecked),
          supabase.from("photos").select("*").gte("updated_at", lastChecked),
        ]);

        if (restAreaError) return { error: restAreaError };
        if (photosError) return { error: photosError };

        const restAreas: Parameters<typeof updateRestAreas>[0] = {
          restAreas: restAreasWithServices.map(restArea => ({
            id: restArea.id,
            name: restArea.name || "",
            latitude: restArea.latitude,
            longitude: restArea.longitude,
            description: restArea.description || "",
            localDescription: restArea.local_description || "",
            status: restArea.status === "open" ? "open" : "closed",
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
          photos: photos
            .sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
            .map(photo => ({
              url: photo.url,
              thumbnailUrl: photo.thumbnail_url,
              description: photo.description,
              restAreaId: photo.rest_area_id,
              updatedAt: new Date(photo.updated_at).getTime(),
              deleted: photo.deleted,
            })),
        };

        return { data: { ...restAreas, checkedAt } };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        if (data) {
          const { checkedAt, ...restAreas } = data;

          const { error } = await updateRestAreas(restAreas);
          if (!error) {
            await AsyncStorage.setItem("lastCheckedAt", checkedAt);
            dispatch(loadRestAreas());
          }
        }
      },
    }),
    addPhoto: builder.mutation<null, { restAreaId: string; uri: string; description?: string }>({
      invalidatesTags: ["RestAreas"],
      queryFn: async ({ restAreaId, uri, description }) => {
        const [compressedBuffer, thumbnailBuffer] = await Promise.all([
          compressImageToBuffer(uri, { maxWidth: 1200, quality: 0.7 }),
          compressImageToBuffer(uri, { maxWidth: 400, quality: 0.7 }),
        ]);

        const { storage } = supabase;
        const path = `${restAreaId}-${Date.now()}.jpeg`;
        const options = { contentType: "image/jpeg" };
        const [photoResponse, thumbnailResponse] = await Promise.all([
          storage.from("photos").upload(path, compressedBuffer, options),
          storage.from("photos").upload(`thumbnails-${path}`, thumbnailBuffer, options),
        ]);

        if (photoResponse.error || thumbnailResponse.error) {
          console.error("Storage upload error:", photoResponse.error || thumbnailResponse.error);
          return { error: photoResponse.error || thumbnailResponse.error };
        }

        const [url, thumbnailUrl] = [photoResponse, thumbnailResponse].map(
          res => supabase.storage.from("photos").getPublicUrl(res.data.path).data.publicUrl,
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

async function compressImageToBuffer(uri: string, options: CompressorOptions) {
  const compressedUri = await Image.compress(uri, options);
  return fetch(compressedUri).then(res => res.arrayBuffer());
}

export const { useRestAreasQuery, useAddPhotoMutation } = restAreasApi;
