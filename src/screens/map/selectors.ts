import { selectFilters } from "@/slices/filters";
import { selectRestAreas } from "@/slices/rest-areas";
import { createSelector } from "@reduxjs/toolkit";

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
