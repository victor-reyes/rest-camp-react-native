import { client, conflictUpdateAllExcept } from "@/db";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { and, eq, inArray, sql } from "drizzle-orm";
import { Service, ServiceInsert } from "../types";
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

    getRestAreaIdsForServices: builder.query<string[] | null, Service[]>({
      queryFn: async servicesNames => {
        if (servicesNames.length === 0) return { data: null };

        const restAreaIds = await db
          .select({ restAreaId: services.restAreaId })
          .from(services)
          .where(and(inArray(services.name, servicesNames), eq(services.deleted, false)))
          .groupBy(services.restAreaId)
          .having(sql`count(distinct ${services.name}) = ${servicesNames.length}`);

        return { data: restAreaIds.map(row => row.restAreaId) };
      },
      providesTags: ["Services"],
    }),

    upsertServices: builder.mutation<null, ServiceInsert[]>({
      queryFn: async (newServices: ServiceInsert[]) => {
        try {
          await db.transaction(async tx => {
            await tx
              .insert(services)
              .values(newServices)
              .onConflictDoUpdate({
                target: services.id,
                set: conflictUpdateAllExcept(services, ["restAreaId", "name"]),
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
    getLatestServiceUpdatedAt: builder.query<number, void>({
      providesTags: ["Services"],
      queryFn: async () => {
        const data = await db.query.services.findFirst({
          columns: { updatedAt: true },
          orderBy: (table, { desc }) => desc(table.updatedAt),
        });
        const latestUpdatedAt = data ? data.updatedAt : 0;
        return { data: latestUpdatedAt };
      },
    }),
  }),
});

export const {
  useGetRestAreaServicesQuery,
  useGetRestAreaIdsForServicesQuery,
  useUpsertServicesMutation,
  useDeleteServicesMutation,
  useGetLatestServiceUpdatedAtQuery,
} = offlineServicesApi;
