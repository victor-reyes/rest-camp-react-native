import { useEffect, useState } from "react";
import { type RestAreaWithInfo } from "@/api/supabase";
import { RestArea, SortMenu, type OrderBy } from ".";

const DEFAULT_ORDER: OrderBy = { sort: "name", direction: "asc" };

type Props = { restAreas: RestAreaWithInfo[] };
export function RestAreas({ restAreas }: Props) {
  const [orderBy, setOrderBy] = useState<OrderBy>(DEFAULT_ORDER);

  const [sortedRestAreas, setSortedRestAreas] = useState<RestAreaWithInfo[]>([]);

  useEffect(() => {
    const sorted = [...restAreas].sort((a, b) => {
      switch (orderBy.sort) {
        case "name":
          return orderBy.direction === "asc" ?
              a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "updated_at":
          return orderBy.direction === "asc" ?
              new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
            : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "deleted":
          return orderBy.direction === "asc" ?
              (a.deleted ? 1 : 0) - (b.deleted ? 1 : 0)
            : (b.deleted ? 1 : 0) - (a.deleted ? 1 : 0);
        default:
          return 0;
      }
    });
    setSortedRestAreas(sorted);
  }, [restAreas, orderBy]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nuvarande rastplatserna:</h1>
      <SortMenu defaultOrder={orderBy} onOrderChange={setOrderBy} />
      <ul className="space-y-4">
        {sortedRestAreas.map(area => (
          <RestArea key={area.id!} restArea={area} />
        ))}
      </ul>
    </div>
  );
}
