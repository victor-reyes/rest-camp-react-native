import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Parking, Response, ResponseSchema } from "./parking-zod-schema";

export const restAreasApi = createApi({
  reducerPath: "restAreasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.trafikinfo.trafikverket.se/v2/data.json",
    prepareHeaders: headers => {
      headers.set("Content-Type", "text/xml");
      return headers;
    },
  }),
  endpoints: builder => ({
    getParkings: builder.query<Parking[], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: getBody(),
      }),
      rawResponseSchema: ResponseSchema,
      transformResponse: async (response: Response) =>
        response?.RESPONSE?.RESULT?.[0]?.Parking || [],
    }),
    getParkingById: builder.query<Parking | undefined, string>({
      query: (id: string) => ({
        url: "",
        method: "POST",
        body: getBody(`<EQ name=\"Id\" value=\"${id}\" />`),
      }),
      rawResponseSchema: ResponseSchema,
      transformResponse: async (response: Response) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return response?.RESPONSE?.RESULT?.[0]?.Parking?.at(0);
      },
    }),
  }),
});

function getBody(filter: string = "") {
  return `<?xml version="1.0" encoding="utf-8"?>
<REQUEST> 
    <LOGIN authenticationkey="${process.env.EXPO_PUBLIC_TRAFIK_INFO_API_KEY}"/>
    <QUERY 
        objecttype="Parking" 
        schemaversion="1.4">
      <FILTER>
        ${filter}
      </FILTER>
    </QUERY>
</REQUEST>`;
}

export const { useGetParkingsQuery, useGetParkingByIdQuery } = restAreasApi;
