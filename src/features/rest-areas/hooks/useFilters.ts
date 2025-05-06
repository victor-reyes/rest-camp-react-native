import { useMemo, useState } from "react";
import { EquipmentCategory, FacilityCategory, Parking } from "@/features/schemas";

export function useFilters(parkings: Parking[]) {
  const [filters, setFilters] = useState<(EquipmentCategory | FacilityCategory)[]>([]);

  const filteredParkings = useMemo(
    () =>
      parkings.filter(parking =>
        filters.every(filter => {
          const { Equipment, Facility } = parking;
          const equipment = Equipment.find(e => e.Type === filter);
          const facility = Facility?.find(f => f.Type === filter);
          return equipment || facility;
        }),
      ),
    [filters, parkings],
  );

  return { filters, setFilters, filteredParkings };
}
