import { useEffect, useState } from "react";
import { supaApi, type RestAreaWithServicesAndPhotos } from "../../api/supabase";
import { RestArea } from "./RestArea";

export function RestAreas() {
  const [restAreas, setRestAreas] = useState<RestAreaWithServicesAndPhotos[]>([]);

  useEffect(() => {
    async function fetchRestAreas() {
      const data = await supaApi().getRestAreas();
      setRestAreas(data);
    }
    fetchRestAreas();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nuvarande rastplatserna:</h1>
      <ul className="space-y-4">
        {restAreas.map(area => (
          <RestArea key={area.id!} restArea={area} />
        ))}
      </ul>
    </div>
  );
}
