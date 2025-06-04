import { createClient } from "npm:@supabase/supabase-js@2";
import { fetchRestAreas } from "./fetch-rest-areas.ts";

Deno.serve(async req => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } },
    );

    const responce = await supabase
      .from("rest_areas")
      .select("updated_at")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();

    const updatedAt = responce.data?.updated_at ?? "1025-01-01T01:31:12.540Z";
    console.log("Last updated at:", updatedAt);

    const restAreas = await fetchRestAreas(updatedAt);

    for await (const restArea of restAreas) {
      const { services, photos, ...insert } = restArea;
      console.log("Inserting or updating rest area:", insert);

      const { data, error } = await supabase
        .from("rest_areas")
        .upsert(insert, { onConflict: "trafikverket_id" })
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
    }

    return new Response(
      JSON.stringify({ message: `${restAreas.length} rest areas have been inserted or updated.` }),
      { status: 200 },
    );
  } catch (err: unknown) {
    return new Response(String((err as Error)?.message ?? err), { status: 500 });
  }
});
