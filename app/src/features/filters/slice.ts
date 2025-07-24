import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "./types";

export type FiltersState = {
  filters: Filter[];
};

const initialState: FiltersState = { filters: [] };

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersCleared: state => {
      state.filters = [];
    },
    filterAdded: (state, { payload }: PayloadAction<Filter>) => {
      if (!state.filters.includes(payload)) state.filters.push(payload);
    },
    filterRemoved: (state, { payload }: PayloadAction<Filter>) => {
      state.filters = state.filters.filter(filter => filter !== payload);
    },
  },
  selectors: {
    selectFilters: state => state.filters,
  },
});

export const { filtersCleared, filterAdded, filterRemoved } = filtersSlice.actions;
export const { selectFilters } = filtersSlice.selectors;
