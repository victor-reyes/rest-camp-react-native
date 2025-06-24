import { useEffect, useState } from "react";
import { supaApi, type RestAreaWithInfo } from "@/api/supabase";
import { RestArea, SortMenu, type OrderBy } from "./components";

const DEFAULT_ORDER: OrderBy = { sort: "name", direction: "asc" };
export function RestAreas() {
  const [restAreas, setRestAreas] = useState<RestAreaWithInfo[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>(DEFAULT_ORDER);

  const [sortedRestAreas, setSortedRestAreas] = useState<RestAreaWithInfo[]>([]);

  useEffect(() => {
    async function fetchRestAreas() {
      const data = await supaApi().getRestAreas();
      setRestAreas(data);
    }
    fetchRestAreas();
  }, []);

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
