import { type Database } from "@/api/supabase";

export type Status = Database["public"]["Tables"]["rest_areas"]["Row"]["status"];
export type Photo = Database["public"]["Tables"]["photos"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];