import { client, conflictUpdateAllExcept } from "@/db";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { inArray } from "drizzle-orm";
import { RestAreaInsert, RestAreaStatus, ServiceInsert } from "../types";
import { restAreas } from "../schema";
import { services } from "@/features/services/schema";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";

const db = drizzle(client, { schema: { restAreas, services } });

export const offlineRestAreasApi = createApi({
  reducerPath: "offlineRestAreasApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RestAreas", "Services"],
  endpoints: builder => ({
    loadRestAreas: builder.query<RestAreaStatus[], void>({
      providesTags: [{ type: "RestAreas", id: "LIST" }],
      queryFn: async () => {
        const restAreas = await db.query.restAreas.findMany({
          columns: { id: true, latitude: true, longitude: true, status: true },
          where: ({ deleted }, { eq }) => eq(deleted, false),
        });

        return { data: restAreas };
      },
    }),
    getRestArea: builder.query({
      queryFn: async (id: string) => {
        const restArea = await db.query.restAreas.findFirst({
          where: (table, { eq }) => eq(table.id, id),
        });

        if (!restArea) return { error: { data: "Rest area not found" } };

        return { data: restArea };
      },
      providesTags: (_res, _err, id) => [{ type: "RestAreas", id }],
    }),

    getLatestRestAreaUpdatedAt: builder.query<number, void>({
      providesTags: [{ type: "RestAreas", id: "LIST" }],
      queryFn: async () => {
        const data = await db.query.restAreas.findFirst({
          columns: { updatedAt: true },
          orderBy: (table, { desc }) => desc(table.updatedAt),
        });
        const latestUpdatedAt = data?.updatedAt || 0;
        return { data: latestUpdatedAt };
      },
    }),

    upsertRestAreas: builder.mutation<string[], RestAreaInsert[]>({
      queryFn: async newRestAreas => {
        try {
          const ids = await db.transaction(tx =>
            tx
              .insert(restAreas)
              .values(newRestAreas)
              .onConflictDoUpdate({
                target: restAreas.id,
                set: conflictUpdateAllExcept(restAreas, ["id"]),
              })
              .returning({ id: restAreas.id })
              .then(rows => rows.map(row => row.id)),
          );
          return { data: ids };
        } catch (error) {
          console.error("Failed to add rest areas:", error);
          return { error: { data: "Failed to add rest areas" } };
        }
      },
      invalidatesTags: ids =>
        ids ?
          [
            ...ids.map(id => ({ type: "RestAreas" as const, id })),
            { type: "RestAreas", id: "LIST" },
          ]
        : [],
    }),

    deleteRestAreas: builder.mutation<null, string[]>({
      queryFn: async ids => {
        try {
          await db.transaction(async tx => tx.delete(restAreas).where(inArray(restAreas.id, ids)));
          return { data: null };
        } catch (error) {
          console.error("Failed to delete rest areas:", error);
          return { error: { data: "Failed to delete rest areas" } };
        }
      },
      invalidatesTags: (_res, _err, ids) => [
        ...ids.map(id => ({ type: "RestAreas" as const, id })),
        { type: "RestAreas", id: "LIST" },
      ],
    }),

    upsertRestAreasWithServices: builder.mutation<null, RestAreasWithServices>({
      queryFn: async data => {
        try {
          await db.transaction(async tx => {
            const [restAreaIds, servicesIds] = [
              data.restAreas.map(r => r.id),
              data.services.map(s => s.restAreaId),
            ];
            await tx.delete(restAreas).where(inArray(restAreas.id, restAreaIds));
            await tx.delete(services).where(inArray(services.restAreaId, servicesIds));

            if (data.restAreas.length > 0) await tx.insert(restAreas).values(data.restAreas);
            if (data.services.length > 0) await tx.insert(services).values(data.services);
          });
          return { data: null };
        } catch (error) {
          console.error("Error inserting data into the database:", error);
          return { error: { data: "Error inserting data into the database" } };
        }
      },
      invalidatesTags: (_res, _err, { restAreas, services }) => {
        const restAreaTags = restAreas.map(r => ({ type: "RestAreas" as const, id: r.id }));
        const serviceTags = services.map(s => ({ type: "Services" as const, id: s.restAreaId }));
        return [
          ...restAreaTags,
          ...serviceTags,
          { type: "RestAreas", id: "LIST" },
          { type: "Services", id: "LIST" },
        ];
      },
    }),
  }),
});

export type RestAreasWithServices = {
  restAreas: RestAreaInsert[];
  services: ServiceInsert[];
};

export const {
  useLoadRestAreasQuery,
  useGetRestAreaQuery,
  useGetLatestRestAreaUpdatedAtQuery,
  useUpsertRestAreasMutation,
  useDeleteRestAreasMutation,
  useUpsertRestAreasWithServicesMutation,
} = offlineRestAreasApi;
