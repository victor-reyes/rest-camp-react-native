import { MergeDeep } from "type-fest";
import { Constants, Database as DatabaseGenerated } from "./database.types";

// Override the type for a specific column in a view:

export const SERVICES = Constants.v1.Enums.service;
export const STATUSES = Constants.v1.Enums.status;

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    v1: {
      Views: {
        photos: {
          Row: {
            deleted: boolean;
            rest_area_id: string;
            thumbnail_url: string;
            updated_at: string;
            url: string;
          };
          Insert: {
            rest_area_id: string;
            thumbnail_url: string;
            url: string;
          };
        };
        profiles: {
          Row: {
            id: string;
            full_name: string | null;
            avatar_url: string | null;
            location: string | null;
            updated_at: string;
          };
          Update: {
            id?: never;
            updated_at: string;
          };
        };
        rest_areas_with_services: {
          Row: {
            id: string;
            name: string;
            latitude: number;
            longitude: number;
            status: Database["v1"]["Enums"]["status"];
            updated_at: string;
            deleted: boolean;
            services: {
              name: Database["v1"]["Enums"]["service"];
              rest_area_id: string;
              updated_at: string;
            }[];
          };
        };

        rest_areas: {
          Row: {
            id: string;
            name: string;
            latitude: number;
            longitude: number;
            status: Database["v1"]["Enums"]["status"];
            updated_at: string;
            deleted: boolean;
          };
        };

        services: {
          Row: {
            id: string;
            name: Database["v1"]["Enums"]["service"];
            rest_area_id: string;
            updated_at: string;
            deleted: boolean;
          };
        };

        reviews: {
          Row: {
            id: string;
            updated_at: string;
            rest_area_id: string;
            owner_id: string;
            score: number;
            deleted: boolean;
          };
          Insert: {
            rest_area_id: string;
            score: number;
            id?: never;
            updated_at: string;
            owner_id?: never;
          };
          Update: {
            updated_at: string;
            rest_area_id?: never;
            owner_id?: never;
            id?: never;
          };
        };
      };
    };
  }
>;
