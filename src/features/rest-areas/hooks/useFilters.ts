import { useState } from "react";
import { Parking } from "@/features/rest-areas/api/schemas";
import { Filter } from "../types";

export function useFilters(parkings: Parking[]) {
  const [filters, setFilters] = useState<Filter[]>([]);

  const filteredParkings = parkings.filter(({ Equipment, Facility }) =>
    filters.every(filter =>
      [...Equipment, ...(Facility || [])].map(service => service.Type).includes(filter),
    ),
  );

  return { filters, setFilters, filteredParkings };
}
