import { client, conflictUpdateAllExcept } from "@/db";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { profiles } from "../schema";
import { ProfileInsert } from "../types";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";

const db = drizzle(client, { schema: { profiles } });

export const offlineProfilesApi = createApi({
  reducerPath: "offlineProfilesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["OfflineProfiles"],
  endpoints: builder => ({
    getProfile: builder.query({
      providesTags: (_res, _err, profileId) => [{ type: "OfflineProfiles", id: profileId }],
      queryFn: async (profileId: string) => {
        const data = await db.query.profiles.findFirst({
          where: (table, { eq }) => eq(table.id, profileId),
        });
        return { data: data ?? null };
      },
    }),

    getProfiles: builder.query({
      providesTags: ["OfflineProfiles"],
      queryFn: async (profileIds: string[]) => {
        if (profileIds.length === 0) return { data: [] };

        const data = await db.query.profiles.findMany({
          where: (table, { inArray }) => inArray(table.id, profileIds),
        });
        return { data };
      },
    }),

    upsertProfiles: builder.mutation<null, ProfileInsert[]>({
      queryFn: async (newProfiles: ProfileInsert[]) => {
        try {
          await db.transaction(async tx => {
            await tx
              .insert(profiles)
              .values(newProfiles)
              .onConflictDoUpdate({
                target: [profiles.id],
                set: conflictUpdateAllExcept(profiles, ["id"]),
              });
          });
          return { data: null };
        } catch (error) {
          console.error("Failed to upsert profiles:", error);
          return { error: { data: "Failed to upsert profiles" } };
        }
      },
      invalidatesTags: ["OfflineProfiles"],
    }),

    getProfileLatestUpdate: builder.query({
      providesTags: (_res, _err, profileId) => [{ type: "OfflineProfiles", id: profileId }],
      queryFn: async (profileId: string) => {
        const data = await db.query.profiles.findFirst({
          columns: { updatedAt: true },
          where: (table, { eq }) => eq(table.id, profileId),
        });
        return { data: data?.updatedAt ?? 0 };
      },
    }),
  }),
});

export const { useGetProfileQuery, useGetProfilesQuery, useUpsertProfilesMutation } =
  offlineProfilesApi;
