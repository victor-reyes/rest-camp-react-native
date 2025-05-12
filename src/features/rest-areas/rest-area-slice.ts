import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RestArea } from "./types";
import { db } from "@/db";
import equal from "fast-deep-equal";
import { RootState } from "@/app/store";
import { selectFilters } from "../filters";

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
});

export const selectRestAreas = (state: RootState) => state.restAreas.restAreas;
export const selectRestAreaId = (_: RootState, restAreaId: string) => restAreaId;

export const selectFilteredRestAreas = createSelector(
  [selectRestAreas, selectFilters],
  (restAreas, filters) => {
    if (filters.length === 0) return restAreas;
    return restAreas.filter(restArea => {
      const services = restArea.services.map(service => service.name);
      return filters.every(filter => services.includes(filter));
    });
  },
);

export const selectRestAreaById = createSelector(
  [selectRestAreas, selectRestAreaId],
  (restAreas, restAreaId) => restAreas.find(restArea => restArea.id === restAreaId),
);
