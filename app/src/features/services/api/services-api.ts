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
    fetchServices: builder.query<null, void>({
      providesTags: ["Services"],
      queryFn: async (_, { dispatch }) => {
        const { data } = await dispatch(
          offlineServicesApi.endpoints.getLatestServiceUpdatedAt.initiate(),
        );
        const updatedAt = data ? new Date(data).toISOString() : DEFAULT_UPDATED_AT;

        const { count, error } = await supabase
          .from("services")
          .select("*", { count: "exact", head: true })
          .gt("updated_at", updatedAt);

        if (error) return { error };

        if (count === 0 || count === null) return { data: null };

        const pageSize = 1000;
        const pages = Math.ceil(count / pageSize);
        const services = (
          await Promise.all(
            Array.from({ length: pages }, (_, i) =>
              supabase
                .from("services")
                .select()
                .gt("updated_at", updatedAt)
                .range(i * pageSize, (i + 1) * pageSize - 1)
                .then(({ data, error }) => {
                  if (error) throw error;
                  return data;
                }),
            ),
          )
        ).flat();

        const serviceInserts: ServiceInsert[] = services.map(service => ({
          id: service.id,
          restAreaId: service.rest_area_id,
          name: service.name,
          updatedAt: new Date(service.updated_at).getTime(),
          deleted: service.deleted,
        }));

        if (serviceInserts.length > 0) {
          console.log(`# of services: ${serviceInserts.length}`);
          await dispatch(offlineServicesApi.endpoints.upsertServices.initiate(serviceInserts));
        }

        return { data: null };
      },
    }),
  }),
});

export const { useFetchServicesQuery } = servicesApi;
