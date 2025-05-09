import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter, Parking } from "./types";
import { db } from "@/db";
import equal from "fast-deep-equal";
import { RootState } from "@/app/store";

type RestArea = Parking;

export type RestAreasState = {
  restAreas: RestArea[];
  filters: Filter[];
};

const initialState: RestAreasState = {
  restAreas: [],
  filters: [],
};

export const loadRestAreas = createAsyncThunk(
  "restAreas/loadRestAreas",
  async () => await db.query.parkings.findMany({ with: { services: true, photos: true } }),
);
export const restAreasSlice = createSlice({
  name: "restAreas",
  initialState,
  reducers: {
    filtersUpdated: (state, { payload }: PayloadAction<Filter[]>) => {
      state.filters = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadRestAreas.fulfilled, (state, { payload }) => {
      if (!equal(state.restAreas, payload)) state.restAreas = payload;
    });
  },
});

export const { filtersUpdated } = restAreasSlice.actions;
export const selectFilters = (state: RootState) => state.restAreas.filters;
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
