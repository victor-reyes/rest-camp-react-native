import { db, photos, restAreas as restAreas, reviews, services } from "@/db";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { and, eq, inArray, sql } from "drizzle-orm";
import {
  Filter,
  PhotoInsert,
  RestAreaInsert,
  RestAreaStatus,
  ReviewInsert,
  Score,
  ServiceInsert,
} from "../types";

export const offlineRestAreasApi = createApi({
  reducerPath: "offlineRestAreasApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RestAreas", "Photos", "Reviews", "Services"],
  endpoints: builder => ({
    loadRestAreas: builder.query<RestAreaStatus[], Filter[]>({
      providesTags: [{ type: "RestAreas", id: "LIST" }],
      queryFn: async filters => {
        const restAreas = (
          await db.query.restAreas.findMany({
            columns: { id: true, latitude: true, longitude: true, status: true },
            with: { services: true },
            where: ({ deleted }, { eq }) => eq(deleted, false),
          })
        )
          .filter(item => filters.every(filter => item.services.some(s => s.name === filter)))
          .map(({ id, latitude, longitude, status }) => ({ id, latitude, longitude, status }));
        return { data: restAreas };
      },
    }),
    getRestArea: builder.query({
      queryFn: async (id: string) => {
        const restArea = await db.query.restAreas.findFirst({ where: eq(restAreas.id, id) });

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
          orderBy: ({ updatedAt }, { desc }) => desc(updatedAt),
        });
        const latestUpdatedAt = data?.updatedAt || 0;
        return { data: latestUpdatedAt };
      },
    }),

    upsertRestAreas: builder.mutation<string[], RestAreaInsert[]>({
      queryFn: async newRestAreas => {
        try {
          const ids = await db.transaction(async tx =>
            (
              await tx
                .insert(restAreas)
                .values(newRestAreas)
                .onConflictDoUpdate({
                  target: restAreas.id,
                  set: {
                    name: sql.raw(`excluded.${restAreas.name.name}`),
                    latitude: sql.raw(`excluded.${restAreas.latitude.name}`),
                    longitude: sql.raw(`excluded.${restAreas.longitude.name}`),
                    description: sql.raw(`excluded.${restAreas.description.name}`),
                    localDescription: sql.raw(`excluded.${restAreas.localDescription.name}`),
                    status: sql.raw(`excluded.${restAreas.status.name}`),
                    updatedAt: sql.raw(`excluded.${restAreas.updatedAt.name}`),
                    deleted: sql.raw(`excluded.${restAreas.deleted.name}`),
                  },
                })
                .returning({ id: restAreas.id })
            ).map(row => row.id),
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

    getRestAreaServices: builder.query({
      queryFn: async (restAreaId: string) => {
        const data = await db.query.services.findMany({
          where: (table, { eq, and }) =>
            and(eq(table.restAreaId, restAreaId), eq(table.deleted, false)),
        });
        return { data };
      },
      providesTags: (_res, _err, restAreaId) => [{ type: "RestAreas", id: restAreaId }],
    }),

    upsertServices: builder.mutation<null, ServiceInsert[]>({
      queryFn: async newServices => {
        try {
          await db.transaction(async tx => {
            await tx
              .insert(services)
              .values(newServices)
              .onConflictDoUpdate({
                target: [services.restAreaId, restAreas.name],
                set: {
                  updatedAt: sql.raw(`excluded.${restAreas.updatedAt.name}`),
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
      queryFn: async restAreaIds => {
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

    getRestAreaPhotos: builder.query({
      queryFn: async (restAreaId: string) => {
        const data = await db.query.photos.findMany({
          where: and(eq(photos.restAreaId, restAreaId), eq(photos.deleted, false)),
        });
        return { data };
      },
      providesTags: (_res, _err, restAreaId) => [{ type: "Photos", id: restAreaId }],
    }),
    upsertPhotos: builder.mutation<null, PhotoInsert[]>({
      queryFn: async newPhotos => {
        try {
          await db.transaction(async tx => {
            await tx
              .insert(photos)
              .values(newPhotos)
              .onConflictDoUpdate({
                target: [photos.url, photos.restAreaId],
                set: {
                  description: sql.raw(`excluded.${photos.description.name}`),
                  updatedAt: sql.raw(`excluded.${photos.updatedAt.name}`),
                  thumbnailUrl: sql.raw(`excluded.${photos.thumbnailUrl.name}`),
                  deleted: sql.raw(`excluded.${photos.deleted.name}`),
                },
              });
          });
          return { data: null };
        } catch (error) {
          console.error("Failed to add photos:", error);
          return { error: { data: "Failed to add photos" } };
        }
      },
      invalidatesTags: (_res, _err, photos) =>
        photos.map(p => ({ type: "Photos", id: p.restAreaId })),
    }),

    deletePhotos: builder.mutation<null, string[]>({
      queryFn: async urls => {
        try {
          await db.transaction(async tx => tx.delete(photos).where(inArray(photos.url, urls)));
          return { data: null };
        } catch (error) {
          console.error("Failed to delete photos:", error);
          return { error: { data: "Failed to delete photos" } };
        }
      },
      invalidatesTags: (_res, _err, urls) => urls.map(url => ({ type: "Photos", id: url })),
    }),

    getLatestPhotoUpdatedAt: builder.query<number, void>({
      providesTags: ["Photos"],
      queryFn: async () => {
        const data = await db.query.photos.findFirst({
          columns: { updatedAt: true },
          orderBy: ({ updatedAt }, { desc }) => desc(updatedAt),
        });
        const latestUpdatedAt = data?.updatedAt || 0;
        return { data: latestUpdatedAt };
      },
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

            const [restAreasToInsert, servicesToInsert] = [
              data.restAreas.filter(r => !r.deleted),
              data.services.filter(s => !s.deleted),
            ];

            if (restAreasToInsert.length > 0) await tx.insert(restAreas).values(restAreasToInsert);
            if (servicesToInsert.length > 0) await tx.insert(services).values(servicesToInsert);
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
    getRestAreaReviews: builder.query({
      providesTags: ["Reviews"],
      queryFn: async restAreaId => {
        const data = await db.query.reviews.findMany({
          where: (table, { and, eq }) =>
            and(eq(table.restAreaId, restAreaId), eq(table.deleted, false)),
        });
        return { data };
      },
    }),
    getRestAreaScore: builder.query<Score, string>({
      providesTags: ["Reviews"],
      queryFn: async restAreaId => {
        const data = await db.query.reviews.findMany({
          columns: { score: true },
          where: (table, { and, eq }) =>
            and(eq(table.restAreaId, restAreaId), eq(table.deleted, false)),
        });
        const average =
          data.length > 0 ? data.reduce((sum, review) => sum + review.score, 0) / data.length : 0;
        return { data: { score: average, numberOfReviews: data.length } };
      },
    }),
    upsertReviews: builder.mutation<null, ReviewInsert[]>({
      queryFn: async newReviews => {
        await db.transaction(async tx => {
          await tx
            .insert(reviews)
            .values(newReviews)
            .onConflictDoUpdate({
              target: [reviews.id],
              set: {
                restAreaId: sql.raw(`excluded.${reviews.restAreaId.name}`),
                score: sql.raw(`excluded.${reviews.score.name}`),
                recension: sql.raw(`excluded.${reviews.recension.name}`),
                updatedAt: sql.raw(`excluded.${reviews.updatedAt.name}`),
                deleted: sql.raw(`excluded.${reviews.deleted.name}`),
              },
            });
        });
        return { data: null };
      },
    }),
    getLatestReviewUpdatedAtByRestArea: builder.query<number, string>({
      providesTags: ["Reviews"],
      queryFn: async restAreaId => {
        const data = await db.query.reviews.findFirst({
          columns: { updatedAt: true },
          where: (table, { eq }) => eq(table.restAreaId, restAreaId),
          orderBy: ({ updatedAt }, { desc }) => desc(updatedAt),
        });
        const latestUpdatedAt = data?.updatedAt || 0;
        return { data: latestUpdatedAt };
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
  useGetRestAreaServicesQuery,
  useUpsertServicesMutation,
  useDeleteServicesMutation,
  useGetRestAreaPhotosQuery,
  useGetLatestPhotoUpdatedAtQuery,
  useUpsertPhotosMutation,
  useDeletePhotosMutation,
  useUpsertRestAreasWithServicesMutation,
} = offlineRestAreasApi;
