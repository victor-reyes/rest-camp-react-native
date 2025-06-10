import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateRestAreas } from "../utils";
import { loadRestAreas } from "../rest-area-slice";
import { supabase } from "@/lib/supabase";

export const restAreasApi = createApi({
  reducerPath: "restAreasApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RestAreas"],
  endpoints: builder => ({
    restAreas: builder.query<Parameters<typeof updateRestAreas>[0], void>({
      providesTags: ["RestAreas"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("rest_areas")
          .select("*, services(*), photos(*)");

        if (error) return { error };

        const restAreas: Parameters<typeof updateRestAreas>[0] = {
          restAreas: data.map(restArea => ({
            id: restArea.id,
            name: restArea.name || "",
            latitude: restArea.latitude,
            longitude: restArea.longitude,
            description: restArea.description || "",
            localDescription: restArea.local_description || "",
            status: restArea.status === "open" ? "open" : "closed",
            numberOfCarSpaces: 0,
            numberOfTruckSpaces: 0,
            modifiedTime: new Date(restArea.updated_at).getTime(),
          })),
          services: data.flatMap(restArea =>
            restArea.services.map(service => ({
              name: service.name,
              restAreaId: restArea.id,
            })),
          ),
          photos: data.flatMap(restArea =>
            restArea.photos
              .sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
              .map(photo => ({
                url: photo.url,
                description: photo.description,
                restAreaId: restArea.id,
              })),
          ),
        };

        return { data: restAreas };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        if (data) {
          await updateRestAreas(data);
          dispatch(loadRestAreas());
        }
      },
    }),
    addPhotos: builder.mutation<null, { restAreaId: string; uri: string; description?: string }>({
      invalidatesTags: ["RestAreas"],
      queryFn: async ({ restAreaId, uri, description }) => {
        const arrayBuffer = await fetch(uri).then(res => res.arrayBuffer());
        const fileExt = uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
        const path = `id${restAreaId}-${Date.now()}.${fileExt}`;

        const { data: storageData, error: storageError } = await supabase.storage
          .from("photos")
          .upload(path, arrayBuffer, { contentType: "image/jpeg" });

        if (storageError) {
          console.error("Storage upload error:", storageError);
          return { error: storageError };
        }

        const url = supabase.storage.from("photos").getPublicUrl(storageData.path).data.publicUrl;

        const { error: insertError } = await supabase.from("photos").insert({
          rest_area_id: restAreaId,
          url,
          thumbnail_url: url,
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

export const { useRestAreasQuery, useAddPhotosMutation } = restAreasApi;
