import { supaApi, type RestAreaWithInfo } from "@/api/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useEffect, useState } from "react";
import { RestAreas } from "../features/rest-areas/components/RestAreas";
import { Merger } from "@/features/rest-areas/components/Merger";

export function Dashboard() {
  const [restAreas, setRestAreas] = useState<RestAreaWithInfo[]>([]);
  const [newAreas, setNewAreas] = useState<RestAreaWithInfo[]>([]);

  useEffect(() => {
    async function fetchRestAreas() {
      const data = (await supaApi().getRestAreas()).filter(area => !area.deleted);
      setRestAreas([]);
      setNewAreas(data);
      console.log(`Fetched ${data.length} rest areas`);
    }
    fetchRestAreas();
  }, []);

  console.log("Current new areas:", newAreas.length);

  return (
    <Tabs defaultValue="updates" className="p-2 max-w-[800px] mx-auto">
      <TabsList className="mx-auto">
        <TabsTrigger value="current">Mina Rastplatser</TabsTrigger>
        <TabsTrigger value="updates">Uppdaterade Rastplatser</TabsTrigger>
      </TabsList>
      <TabsContent value="current">
        <RestAreas restAreas={newAreas} />
      </TabsContent>
      <TabsContent value="updates">
        {newAreas.length > 0 ?
          <Merger defaultCurrent={restAreas} defaultNew={newAreas} />
        : <p>Inga nya områden att bearbeta</p>}
      </TabsContent>
    </Tabs>
  );
}
