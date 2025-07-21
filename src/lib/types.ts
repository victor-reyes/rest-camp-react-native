import { MergeDeep } from "type-fest";
import { Constants, Database as DatabaseGenerated } from "./database.types";

// Override the type for a specific column in a view:

export const SERVICES = Constants.v1.Enums.service;
export const STATUSES = Constants.v1.Enums.status;

type Service = (typeof SERVICES)[number];
type Status = (typeof STATUSES)[number];

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
          };
        };
        rest_areas_with_services: {
          Row: {
            id: string;
            name: string;
            latitude: number;
            longitude: number;
            status: Status;
            updated_at: string;
            deleted: boolean;
            services: {
              name: Service;
              rest_area_id: string;
              updated_at: string;
            }[];
          };
        };

        services: {
          Row: {
            id: string;
            name: Service;
            rest_area_id: string;
            updated_at: string;
            deleted: boolean;
          };
        };

        reviews: {
          Row: {
            id: string;
            rest_area_id: string;
            owner_id: string;
            score: number;
            deleted: boolean;
          };
          Insert: {
            rest_area_id: string;
            owner_id: string;
            score: number;
          };
        };
      };
    };
  }
>;
