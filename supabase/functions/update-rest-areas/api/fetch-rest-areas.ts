import { ResponseSchema } from "./schemas/index.ts";
import { RestAreaApiResponse, RestAreaWithServicesAndPhotos } from "../types.ts";

export async function fetchRestAreas(datetime: string) {
  const response = await fetch("https://api.trafikinfo.trafikverket.se/v2/data.json", {
    method: "POST",
    headers: { "Content-Type": "text/xml" },
    body: getBody(datetime),
  });

  if (!response.ok) throw new Error(`Error fetching rest areas: ${response.statusText}`);

  const json = await response.json();

  const verifiedJson = ResponseSchema.safeParse(json);
  if (!verifiedJson.success) {
    console.error("Invalid response schema:", verifiedJson.error);
    throw new Error("Invalid response schema from Trafikverket API");
  }
  const data = transformToSql(verifiedJson.data);

  return data;
}

function getBody(datetime: string) {
  return `<?xml version="1.0" encoding="utf-8"?>
<REQUEST> 
    <LOGIN authenticationkey="${Deno.env.get("TRAFIK_API_KEY")}"/>
    <QUERY 
        objecttype="Parking" 
        schemaversion="1.4"
        includedeletedobjects="true"
        >
      <FILTER>
      <GT name="ModifiedTime" value="${datetime}" />
      </FILTER>
    </QUERY>
</REQUEST>`;
}

function transformToSql(raw: RestAreaApiResponse) {
  const responce = ResponseSchema.parse(raw);
  const data = responce.RESPONSE.RESULT[0].Parking || [];

  const restAreas = data.map((item): RestAreaWithServicesAndPhotos => {
    const localDescription = [item.LocationDescription, item.DistanceToNearestCity]
      .filter(Boolean)
      .join(" ");
    return {
      trafikverket_id: item.Id,
      name: item.Name,
      latitude: item.Geometry.latitude,
      longitude: item.Geometry.longitude,
      description: item.Description,
      local_description: localDescription,
      status: item.OpenStatus,
      updated_at: item.ModifiedTime,
      deleted: item.Deleted,
      services: [...item.Equipment, ...(item.Facility || [])].map(service => ({
        name: service.Type,
      })),
      photos: (item.Photo || []).map(photo => ({
        url: photo.Url,
        description: photo.Title,
        thumbnail_url: photo.Url,
      })),
    };
  });

  return restAreas;
}
