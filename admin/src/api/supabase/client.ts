import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const supaApi = () => {
  const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  );

  return {
    async getRestAreas() {
      const { data, error } = await supabase.from("rest_areas").select(
        ` 
          *, 
          services(*), 
          photos(*), 
          reviews(*)
        `,
      );
      if (error) throw error;
      return data;
    },
  };
};
