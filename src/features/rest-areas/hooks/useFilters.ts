import { useState } from "react";
import { Filter, Parking } from "../types";

export function useFilters(parkings: Parking[]) {
  const [filters, setFilters] = useState<Filter[]>([]);

  const filteredParkings = parkings.filter(({ services }) =>
    filters.every(filter => services.map(service => service.name).includes(filter)),
  );

  return { filters, setFilters, filteredParkings };
}
