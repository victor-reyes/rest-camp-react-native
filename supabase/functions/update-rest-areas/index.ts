import { fetchRestAreas } from "./api/index.ts";
import { getSupabaseClient } from "./api/supabase.ts";

Deno.serve(async _req => {
  const supabase = getSupabaseClient();
  try {
    const updatedAt = await supabase.getLastUpdatedAt();

    const restAreas = await fetchRestAreas(updatedAt);

    for (const restArea of restAreas) await supabase.upsertRestArea(restArea);

    const response = JSON.stringify(`${restAreas.length} rest areas have been upserted.`);
    return new Response(response, { status: 200 });
  } catch (err: unknown) {
    return new Response(String((err as Error)?.message ?? err), { status: 500 });
  }
});
