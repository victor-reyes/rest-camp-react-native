import { client } from "@/db";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { inArray, sql } from "drizzle-orm";
import { ServiceInsert } from "../types";
import { services } from "../schema";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";

const db = drizzle(client, { schema: { services } });

export const offlineServicesApi = createApi({
  reducerPath: "offlineServicesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Services"],
  endpoints: builder => ({
    getRestAreaServices: builder.query({
      queryFn: async (restAreaId: string) => {
        const data = await db.query.services.findMany({
          where: (table, { eq, and }) =>
            and(eq(table.restAreaId, restAreaId), eq(table.deleted, false)),
        });
        return { data };
      },
      providesTags: (_res, _err, restAreaId) => [{ type: "Services", id: restAreaId }],
    }),

    upsertServices: builder.mutation<null, ServiceInsert[]>({
      queryFn: async (newServices: ServiceInsert[]) => {
        try {
          await db.transaction(async tx => {
            await tx
              .insert(services)
              .values(newServices)
              .onConflictDoUpdate({
                target: [services.restAreaId, services.name],
                set: {
                  updatedAt: sql.raw(`excluded.${services.updatedAt.name}`),
                  deleted: sql.raw(`excluded.${services.deleted.name}`),
                },
              });
          });
          return { data: null };
        } catch (error) {
          console.error("Failed to add services:", error);
          return { error: { data: "Failed to add services" } };
        }
      },
      invalidatesTags: (_res, _err, services) =>
        services.map(s => ({ type: "Services", id: s.restAreaId })),
    }),

    deleteServices: builder.mutation<null, string[]>({
      queryFn: async (restAreaIds: string[]) => {
        try {
          await db.transaction(async tx =>
            tx.delete(services).where(inArray(services.restAreaId, restAreaIds)),
          );
          return { data: null };
        } catch (error) {
          console.error("Failed to delete services:", error);
          return { error: { data: "Failed to delete services" } };
        }
      },
      invalidatesTags: (_res, _err, ids) => ids.map(id => ({ type: "Services", id })),
    }),
  }),
});

export const { useGetRestAreaServicesQuery, useUpsertServicesMutation, useDeleteServicesMutation } =
  offlineServicesApi;
