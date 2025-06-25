import type { RestAreaWithInfo } from "@/api/supabase";
import { equalByCoordinates, equalByTrafikverketId } from "./utils";

export function mergeRestAreas(
  areas: ReadonlyArray<RestAreaWithInfo>,
  newAreas: ReadonlyArray<RestAreaWithInfo>,
): {
  merged: { versions: RestAreaWithInfo[] }[];
  unprocessed: RestAreaWithInfo[];
} {
  const merged: { id: string; versions: RestAreaWithInfo[] }[] = [];

  for (const area of areas) {
    const versions = newAreas.filter(
      newArea => equalByCoordinates(newArea, area) && !equalByTrafikverketId(newArea, area),
    );
    if (versions.length > 0) merged.push({ id: area.id, versions: [...versions] });
  }

  const processedIds = new Set(merged.flatMap(item => item.versions.map(v => v.id)));
  const unprocessed: RestAreaWithInfo[] = newAreas.filter(newArea => !processedIds.has(newArea.id));

  return { merged, unprocessed };
}
