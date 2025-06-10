export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      photos: {
        Row: {
          deleted: boolean;
          description: string | null;
          owner_id: string | null;
          rest_area_id: string;
          review_id: string | null;
          thumbnail_url: string;
          updated_at: string;
          url: string;
        };
        Insert: {
          deleted?: boolean;
          description?: string | null;
          owner_id?: string | null;
          rest_area_id: string;
          review_id?: string | null;
          thumbnail_url: string;
          updated_at?: string;
          url: string;
        };
        Update: {
          deleted?: boolean;
          description?: string | null;
          owner_id?: string | null;
          rest_area_id?: string;
          review_id?: string | null;
          thumbnail_url?: string;
          updated_at?: string;
          url?: string;
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
            referencedRelation: "rest_areas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photos_review_id_fkey";
            columns: ["review_id"];
            isOneToOne: false;
            referencedRelation: "reviews";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          location: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          location?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          location?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      rest_areas: {
        Row: {
          deleted: boolean;
          description: string | null;
          id: string;
          latitude: number;
          local_description: string | null;
          longitude: number;
          name: string;
          status: string;
          trafikverket_id: string;
          updated_at: string;
        };
        Insert: {
          deleted?: boolean;
          description?: string | null;
          id?: string;
          latitude: number;
          local_description?: string | null;
          longitude: number;
          name: string;
          status: string;
          trafikverket_id: string;
          updated_at: string;
        };
        Update: {
          deleted?: boolean;
          description?: string | null;
          id?: string;
          latitude?: number;
          local_description?: string | null;
          longitude?: number;
          name?: string;
          status?: string;
          trafikverket_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          deleted: boolean;
          id: string;
          owner_id: string;
          recension: string | null;
          rest_area_id: string;
          score: number;
          updated_at: string;
        };
        Insert: {
          deleted?: boolean;
          id?: string;
          owner_id?: string;
          recension?: string | null;
          rest_area_id: string;
          score: number;
          updated_at?: string;
        };
        Update: {
          deleted?: boolean;
          id?: string;
          owner_id?: string;
          recension?: string | null;
          rest_area_id?: string;
          score?: number;
          updated_at?: string;
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
            referencedRelation: "rest_areas";
            referencedColumns: ["id"];
          },
        ];
      };
      services: {
        Row: {
          name: Database["public"]["Enums"]["service"];
          rest_area_id: string;
        };
        Insert: {
          name: Database["public"]["Enums"]["service"];
          rest_area_id: string;
        };
        Update: {
          name?: Database["public"]["Enums"]["service"];
          rest_area_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "services_rest_area_id_fkey";
            columns: ["rest_area_id"];
            isOneToOne: false;
            referencedRelation: "rest_areas";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
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
  public: {
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
    },
  },
} as const;
