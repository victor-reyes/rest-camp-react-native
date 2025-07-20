import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib";
import { offlineServicesApi } from "./offline-services-api";
import { ServiceInsert } from "../types";

const DEFAULT_UPDATED_AT = "1970-01-01T00:00:00Z";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Services"],
  endpoints: builder => ({
    fetchServicesForRestAreas: builder.query<null, void>({
      providesTags: ["Services"],
      queryFn: async (_, { dispatch }) => {
        // This endpoint would be called as part of the rest areas fetch
        // For now, services are fetched as part of the rest_areas_with_services view
        // This is a placeholder for future service-specific fetching logic
        return { data: null };
      },
    }),
  }),
});

export const { useFetchServicesForRestAreasQuery } = servicesApi;
