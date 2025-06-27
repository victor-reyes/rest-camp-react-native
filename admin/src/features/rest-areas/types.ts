import { type Database } from "@/api/supabase";

export type Status = Database["public"]["Tables"]["rest_areas"]["Row"]["status"];
