import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseSchema } from "./schemas";
import { transformToSql } from "./transform-to-sql";
import { updateDb } from "../utils/updateDb";
import { loadRestAreas } from "../rest-area-slice";

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
    restAreas: builder.query<Awaited<ReturnType<typeof transformToSql>>, void>({
      query: () => ({
        url: "",
        method: "POST",
        body: getBody(),
      }),
      rawResponseSchema: ResponseSchema,
      transformResponse: transformToSql,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        if (data) {
          await updateDb(data);
          dispatch(loadRestAreas());
        }
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

export const { useRestAreasQuery } = restAreasApi;
