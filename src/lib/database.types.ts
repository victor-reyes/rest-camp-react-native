export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  v1: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      photos: {
        Row: {
          deleted: boolean | null;
          description: string | null;
          owner_id: string | null;
          rest_area_id: string | null;
          review_id: string | null;
          thumbnail_url: string | null;
          updated_at: string | null;
          url: string | null;
        };
        Insert: {
          deleted?: boolean | null;
          description?: string | null;
          owner_id?: string | null;
          rest_area_id?: string | null;
          review_id?: string | null;
          thumbnail_url?: string | null;
          updated_at?: string | null;
          url?: string | null;
        };
        Update: {
          deleted?: boolean | null;
          description?: string | null;
          owner_id?: string | null;
          rest_area_id?: string | null;
          review_id?: string | null;
          thumbnail_url?: string | null;
          updated_at?: string | null;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "photos_owner_id_fkey1";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photos_rest_area_id_fkey";
            columns: ["rest_area_id"];
            isOneToOne: false;
            referencedRelation: "rest_areas_with_services";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photos_review_id_fkey";
            columns: ["review_id"];
            isOneToOne: false;
            referencedRelation: "reviews";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photos_review_id_fkey";
            columns: ["review_id"];
            isOneToOne: false;
            referencedRelation: "reviews_with_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string | null;
          location: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string | null;
          location?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string | null;
          location?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      rest_areas_with_services: {
        Row: {
          deleted: boolean | null;
          description: string | null;
          id: string | null;
          latitude: number | null;
          local_description: string | null;
          longitude: number | null;
          name: string | null;
          services: Json | null;
          status: Database["v1"]["Enums"]["status"] | null;
          trafikverket_id: string | null;
          updated_at: string | null;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          deleted: boolean | null;
          id: string | null;
          owner_id: string | null;
          recension: string | null;
          rest_area_id: string | null;
          score: number | null;
          updated_at: string | null;
        };
        Insert: {
          deleted?: boolean | null;
          id?: string | null;
          owner_id?: string | null;
          recension?: string | null;
          rest_area_id?: string | null;
          score?: number | null;
          updated_at?: string | null;
        };
        Update: {
          deleted?: boolean | null;
          id?: string | null;
          owner_id?: string | null;
          recension?: string | null;
          rest_area_id?: string | null;
          score?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_owner_id_fkey1";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_rest_area_id_fkey";
            columns: ["rest_area_id"];
            isOneToOne: false;
            referencedRelation: "rest_areas_with_services";
            referencedColumns: ["id"];
          },
        ];
      };
      reviews_with_profiles: {
        Row: {
          avatar_url: string | null;
          deleted: boolean;
          full_name: string | null;
          id: string;
          owner_id: string;
          recension: string | null;
          rest_area_id: string;
          score: number;
          updated_at: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_owner_id_fkey1";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_rest_area_id_fkey";
            columns: ["rest_area_id"];
            isOneToOne: false;
            referencedRelation: "rest_areas_with_services";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      service:
        | "refuseBin"
        | "toilet"
        | "picnicFacilities"
        | "playground"
        | "dumpingStation"
        | "touristInformation"
        | "restaurant"
        | "petrolStation";
      status: "inOperation" | "limitedOperation" | "outOfService";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof Database;
    }
  ) ?
    keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends { schema: keyof Database } ?
    (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends (
      {
        Row: infer R;
      }
    ) ?
      R
    : never
  : DefaultSchemaTableNameOrOptions extends (
    keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ) ?
    (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends (
      {
        Row: infer R;
      }
    ) ?
      R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof Database;
    }
  ) ?
    keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends { schema: keyof Database } ?
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends (
      {
        Insert: infer I;
      }
    ) ?
      I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ?
    DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends (
      {
        Insert: infer I;
      }
    ) ?
      I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof Database;
    }
  ) ?
    keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends { schema: keyof Database } ?
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends (
      {
        Update: infer U;
      }
    ) ?
      U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ?
    DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends (
      {
        Update: infer U;
      }
    ) ?
      U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends (
    {
      schema: keyof Database;
    }
  ) ?
    keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> =
  DefaultSchemaEnumNameOrOptions extends { schema: keyof Database } ?
    Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] ?
    DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends (
    {
      schema: keyof Database;
    }
  ) ?
    keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> =
  PublicCompositeTypeNameOrOptions extends { schema: keyof Database } ?
    Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] ?
    DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  v1: {
    Enums: {
      service: [
        "refuseBin",
        "toilet",
        "picnicFacilities",
        "playground",
        "dumpingStation",
        "touristInformation",
        "restaurant",
        "petrolStation",
      ],
      status: ["inOperation", "limitedOperation", "outOfService"],
    },
  },
} as const;
