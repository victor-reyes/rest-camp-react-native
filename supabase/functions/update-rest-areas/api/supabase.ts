import { createClient } from "@supabase/supabase-js";
import { RestAreaWithServicesAndPhotos } from "../types.ts";

export const getSupabaseClient = (authorization: string) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authorization } } },
  );

  return {
    async getLastUpdatedAt(): Promise<string> {
      const response = await supabase
        .from("rest_areas")
        .select("updated_at")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (response.error) {
        throw new Error(`Error fetching last updated time: ${response.error.message}`);
      }

      return response.data?.updated_at ?? "1025-01-01T01:31:12.540Z";
    },
    async upsertRestArea(restAreaWithServicesAndPhotos: RestAreaWithServicesAndPhotos) {
      const { services, photos, ...restArea } = restAreaWithServicesAndPhotos;

      const { data, error } = await supabase
        .from("rest_areas")
        .upsert(restArea, { onConflict: "trafikverket_id" })
        .select("id")
        .single();

      if (error) {
        console.error("Error inserting or updating rest area:", error);
        throw error;
      }

      const id = data?.id;
      if (!id) throw new Error("Failed to insert or update rest area");

      const { error: serviceError } = await supabase.from("services").upsert(
        services.map(service => ({ ...service, rest_area_id: id })),
        { onConflict: "name, rest_area_id" },
      );
      if (serviceError) {
        console.error("Error inserting or updating service:", serviceError);
        throw serviceError;
      }

      const { error: photoError } = await supabase.from("photos").upsert(
        photos.map(photo => ({ ...photo, rest_area_id: id })),
        { onConflict: "url" },
      );

      if (photoError) {
        console.error("Error inserting or updating photo:", photoError);
        throw photoError;
      }
    },
  };
};
