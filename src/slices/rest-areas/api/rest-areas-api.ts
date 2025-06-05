import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformToSql } from "./transform-to-sql";
import { updateDb } from "../utils/updateDb";
import { loadRestAreas } from "../rest-area-slice";
import { supabase } from "@/lib/supabase";

export const restAreasApi = createApi({
  reducerPath: "restAreasApi",
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    restAreas: builder.query<Awaited<ReturnType<typeof transformToSql>>, void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("rest_areas")
          .select("*, services(*), photos(*)");

        if (error) return { error };



        const restAreas: Awaited<ReturnType<typeof transformToSql>> = {
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
            restArea.photos.map(photo => ({
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
          await updateDb(data);
          dispatch(loadRestAreas());
        }
      },
    }),
  }),
});

export const { useRestAreasQuery } = restAreasApi;
