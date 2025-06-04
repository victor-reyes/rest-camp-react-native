import process from "node:process";
import { transformToSql } from "./schemas/transform-to-sql.ts";

export async function fetchRestAreas(datetime: string = "1025-05-27T01:31:12.540Z") {
  const response = await fetch("https://api.trafikinfo.trafikverket.se/v2/data.json", {
    method: "POST",
    headers: { "Content-Type": "text/xml" },
    body: getBody(datetime),
  });

  if (!response.ok) throw new Error(`Error fetching rest areas: ${response.statusText}`);

  const json = await response.json();

  const data = transformToSql(json);

  console.log(`Fetched ${data.length} rest areas`);

  return data;
}

function getBody(datetime: string) {
  return `<?xml version="1.0" encoding="utf-8"?>
<REQUEST> 
    <LOGIN authenticationkey="${process.env.TRAFIK_API_KEY}"/>
    <QUERY 
        objecttype="Parking" 
        schemaversion="1.4">
      <FILTER>
      <GT name="ModifiedTime" value="${datetime}" />
      </FILTER>
    </QUERY>
</REQUEST>`;
}
