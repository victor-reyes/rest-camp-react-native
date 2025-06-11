import { createClient } from "@supabase/supabase-js";
import { RestAreaWithServicesAndPhotos } from "../types.ts";

export const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  return {
    async getLastUpdatedAt(): Promise<string> {
      const response = await supabase
        .from("rest_areas")
        .select("updated_at")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (response.error)
        throw new Error(`Error fetching last updated time: ${response.error.message}`);

      return response.data?.updated_at ?? "1025-01-01T01:31:12.540Z";
    },

    async upsertRestArea(restAreaWithServicesAndPhotos: RestAreaWithServicesAndPhotos) {
      const { services, photos, ...restArea } = restAreaWithServicesAndPhotos;

      const { data: insertedRestArea, error: insertRestAreaError } = await supabase
        .from("rest_areas")
        .upsert(restArea, { onConflict: "trafikverket_id", ignoreDuplicates: false })
        .select("id")
        .single();

      if (insertRestAreaError) throw insertRestAreaError;

      const id = insertedRestArea?.id;
      if (!id) throw new Error("Failed to insert or update rest area");

      const { error: deleteServicesError } = await supabase
        .from("services")
        .delete()
        .eq("rest_area_id", id);

      if (deleteServicesError) throw deleteServicesError;

      const { error: insertServiceError } = await supabase
        .from("services")
        .insert(services.map(service => ({ ...service, rest_area_id: id })));

      if (insertServiceError) throw insertServiceError;

      const { error: insertPhotoError } = await supabase.from("photos").upsert(
        photos.map(photo => ({ ...photo, rest_area_id: id })),
        { onConflict: "url", ignoreDuplicates: true },
      );

      if (insertPhotoError) throw insertPhotoError;
    },
  };
};
