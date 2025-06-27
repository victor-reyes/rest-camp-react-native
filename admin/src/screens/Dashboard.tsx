import { supaApi, type RestAreaWithInfo } from "@/api/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useEffect, useState } from "react";
import { RestAreas } from "../features/rest-areas/components/RestAreas";
import { Merger } from "@/features/rest-areas/components/Merger";
import { sortByUpdatedAt } from "@/features/rest-areas/utils/utils";

export function Dashboard() {
  const [restAreas, setRestAreas] = useState<RestAreaWithInfo[]>([]);
  const [newAreas, setNewAreas] = useState<RestAreaWithInfo[]>([]);

  useEffect(() => {
    async function fetchRestAreas() {
      const currentAreas = (await supaApi().getRestAreas()).filter(area => !area.deleted);
      const latestUpdatedAt = currentAreas.sort(sortByUpdatedAt)[0]?.updated_at;
      const updatedAreas = await supaApi().getUpdates(latestUpdatedAt);
      setRestAreas(currentAreas);
      setNewAreas(updatedAreas);
    }
    fetchRestAreas();
  }, []);

  console.log("Current new areas:", newAreas.length);
  console.log("Current rest areas:", restAreas.length);

  return (
    <Tabs defaultValue="updates" className="p-2 max-w-[1200px] mx-auto">
      <TabsList className="mx-auto">
        <TabsTrigger value="current">Mina Rastplatser</TabsTrigger>
        <TabsTrigger value="updates">Uppdaterade Rastplatser</TabsTrigger>
      </TabsList>
      <TabsContent value="current">
        <RestAreas restAreas={restAreas} />
      </TabsContent>
      <TabsContent value="updates">
        {newAreas.length > 0 ?
          <Merger defaultCurrent={restAreas} defaultNew={newAreas} />
        : <p>Inga nya områden att bearbeta</p>}
      </TabsContent>
    </Tabs>
  );
}
