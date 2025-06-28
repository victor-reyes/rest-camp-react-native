import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const supaApi = () => {
  const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  );

  return {
    async getRestAreas() {
      const { data, error } = await supabase
        .from("rest_areas")
        .select(
          ` *, 
            services(name),
            photos(url, thumbnail_url, description)
          `,
        )
        .eq("deleted", false)
        .order("updated_at", { ascending: true });
      if (error) throw error;
      return data;
    },

    async getUpdates(after_update_at?: string) {
      const { data, error } = await supabase
        .schema("log")
        .from("rest_areas")
        .select(
          ` *, 
            services(name),
            photos(url, thumbnail_url, description)
          `,
        )
        .eq("processed", false)
        .gt("updated_at", after_update_at)
        .order("updated_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  };
};
