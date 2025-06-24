import type { RestAreaWithInfo } from "@/api/supabase";
import { equalByTrafikverketId } from "./utils";

export function updateRestAreas(
  areas: ReadonlyArray<RestAreaWithInfo>,
  newAreas: ReadonlyArray<RestAreaWithInfo>,
): {
  updated: { versions: RestAreaWithInfo[] }[];
  unprocessed: RestAreaWithInfo[];
} {
  const updated: { id: string; versions: RestAreaWithInfo[] }[] = [];

  for (const area of areas) {
    const versions = newAreas.filter(newArea => equalByTrafikverketId(newArea, area));
    if (versions.length > 0) updated.push({ id: area.id, versions });
  }

  const processedIds = new Set(updated.flatMap(item => item.versions.map(v => v.id)));
  const unprocessed: RestAreaWithInfo[] = newAreas.filter(newArea => !processedIds.has(newArea.id));

  return { updated, unprocessed };
}
