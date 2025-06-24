import type { RestAreaWithInfo } from "@/api/supabase";
import { equalByCoordinates, equalByTrafikverketId } from "./utils";

export function addRestAreas(
  areas: ReadonlyArray<RestAreaWithInfo>,
  newAreas: ReadonlyArray<RestAreaWithInfo>,
): {
  added: RestAreaWithInfo[];
  unprocessed: RestAreaWithInfo[];
} {
  const added: RestAreaWithInfo[] = [];
  const unprocessed: RestAreaWithInfo[] = [];

  for (const newArea of newAreas) {
    const exist = [...areas, ...added].some(
      area => equalByTrafikverketId(area, newArea) || equalByCoordinates(area, newArea),
    );

    if (!exist) added.push(newArea);
    else unprocessed.push(newArea);
  }

  return { added, unprocessed };
}
