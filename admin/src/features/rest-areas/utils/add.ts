import type { RestAreaWithInfo } from "@/api/supabase";

export function addRestAreas(
  areas: RestAreaWithInfo[],
  newAreas: RestAreaWithInfo[],
): {
  added: RestAreaWithInfo[];
  unprocessed: RestAreaWithInfo[];
} {
  const added: RestAreaWithInfo[] = [];
  const unprocessed: RestAreaWithInfo[] = [];

  for (const newArea of newAreas) {
    const exist = areas.some(area => equalById(area, newArea) || equalByCoordinates(area, newArea));

    if (!exist) added.push(newArea);
    else unprocessed.push(newArea);
  }

  return { added, unprocessed };
}

const equalById = (a: RestAreaWithInfo, b: RestAreaWithInfo) =>
  a.trafikverket_id === b.trafikverket_id;

const equalByCoordinates = (a: RestAreaWithInfo, b: RestAreaWithInfo) =>
  a.latitude === b.latitude && a.longitude === b.longitude;
