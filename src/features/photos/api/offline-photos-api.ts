import { client } from "@/db";
import { photos } from "../schema";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { inArray, sql } from "drizzle-orm";
import { PhotoInsert } from "../types";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";

const db = drizzle(client, { schema: { photos } });

export const offlinePhotosApi = createApi({
  reducerPath: "offlinePhotosApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Photos"],
  endpoints: builder => ({
    getRestAreaPhotos: builder.query({
      queryFn: async (restAreaId: string) => {
        const data = await db.query.photos.findMany({
          where: (table, { eq, and }) =>
            and(eq(table.restAreaId, restAreaId), eq(table.deleted, false)),
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
          orderBy: (table, { desc }) => desc(table.updatedAt),
        });
        const latestUpdatedAt = data?.updatedAt || 0;
        return { data: latestUpdatedAt };
      },
    }),
  }),
});

export const {
  useGetRestAreaPhotosQuery,
  useUpsertPhotosMutation,
  useDeletePhotosMutation,
  useGetLatestPhotoUpdatedAtQuery,
} = offlinePhotosApi;
