import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Parking, Response, ResponseSchema } from "./parking-zod-schema";

const PARKING_REQUEST_BODY = `<?xml version="1.0" encoding="utf-8"?>
<REQUEST> 
    <LOGIN authenticationkey="${process.env.EXPO_PUBLIC_TRAFIK_INFO_API_KEY}"/>
    <QUERY 
        objecttype="Parking" 
        schemaversion="1.4"/>
</REQUEST>`;

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
        body: PARKING_REQUEST_BODY,
      }),
      rawResponseSchema: ResponseSchema,
      transformResponse: async (response: Response) =>
        response?.RESPONSE?.RESULT?.[0]?.Parking || [],
    }),
  }),
});

export const { useGetParkingsQuery } = restAreasApi;
