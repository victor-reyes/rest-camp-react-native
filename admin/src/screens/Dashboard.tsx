import { supaApi, type RestAreaWithInfo } from "@/api/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useEffect, useState } from "react";
import { RestAreas } from "../features/rest-areas/components/RestAreas";

export function Dashboard() {
  const [restAreas, setRestAreas] = useState<RestAreaWithInfo[]>([]);
  useEffect(() => {
    async function fetchRestAreas() {
      const data = await supaApi().getRestAreas();
      setRestAreas(data);
    }
    fetchRestAreas();
  }, []);

  return (
    <Tabs defaultValue="current" className="p-2 max-w-[800px] mx-auto">
      <TabsList className="mx-auto">
        <TabsTrigger value="current">Mina Rastplatser</TabsTrigger>
        <TabsTrigger value="update">Uppdaterade Rastplatser</TabsTrigger>
      </TabsList>
      <TabsContent value="current">
        <RestAreas restAreas={restAreas} />
      </TabsContent>
      <TabsContent value="update">Visa uppdaterade rastplatser här.</TabsContent>
    </Tabs>
  );
}
