import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RestArea } from "./types";
import { db } from "@/db";
import equal from "fast-deep-equal";

export type RestAreasState = {
  restAreas: RestArea[];
};

const initialState: RestAreasState = { restAreas: [] };

export const loadRestAreas = createAsyncThunk(
  "restAreas/loadRestAreas",
  async () => await db.query.restAreas.findMany({ with: { services: true, photos: true } }),
);
export const restAreasSlice = createSlice({
  name: "restAreas",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadRestAreas.fulfilled, (state, { payload }) => {
      if (!equal(state.restAreas, payload)) state.restAreas = payload;
    });
  },
  selectors: {
    selectRestAreas: state => state.restAreas,
    selectRestAreaId: (_, restAreaId: string) => restAreaId,
    selectRestAreaById: ({ restAreas }, restAreaId: string) =>
      restAreas.find(restArea => restArea.id === restAreaId),
  },
});

export const { selectRestAreas, selectRestAreaId, selectRestAreaById } = restAreasSlice.selectors;
