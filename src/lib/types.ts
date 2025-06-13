import { MergeDeep } from "type-fest";
import { Constants, Database as DatabaseGenerated } from "./database.types";

// Override the type for a specific column in a view:

type Service = (typeof Constants.v1.Enums.service)[number];
type Status = (typeof Constants.v1.Enums.status)[number];

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
