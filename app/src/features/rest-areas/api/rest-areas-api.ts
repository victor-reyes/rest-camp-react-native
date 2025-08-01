import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib";
import { offlineRestAreasApi } from "./offline-rest-areas-api";
import { RestAreaInsert } from "../types";

const DEFAULT_UPDATED_AT = "1970-01-01T00:00:00Z";

export const restAreasApi = createApi({
  reducerPath: "restAreasApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RestAreas"],
  endpoints: builder => ({
    fetchRestAreasWithServices: builder.query<null, void>({
      providesTags: ["RestAreas"],
      queryFn: async (_, { dispatch }) => {
        const { data } = await dispatch(
          offlineRestAreasApi.endpoints.getLatestRestAreaUpdatedAt.initiate(),
        );

        const updatedAt = data ? new Date(data).toISOString() : DEFAULT_UPDATED_AT;

        console.log(`Current date: ${new Date().toISOString()}`);
        console.log(`Last updated at: ${updatedAt}`);
        const { data: restAreasData, error: fetchError } = await supabase
          .from("rest_areas")
          .select()
          .gt("updated_at", updatedAt);

        if (fetchError) return { error: fetchError };

        const restAreas: RestAreaInsert[] = restAreasData.map(restArea => ({
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
        }));

        if (restAreas.length > 0) {
          console.log(`# of rest areas: ${restAreas.length}`);

          await dispatch(offlineRestAreasApi.endpoints.upsertRestAreas.initiate(restAreas));
        }

        return { data: null };
      },
    }),
  }),
});

export const { useFetchRestAreasWithServicesQuery } = restAreasApi;
