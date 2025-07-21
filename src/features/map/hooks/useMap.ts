import { useMemo, useState } from "react";
import { useAppSelector } from "@/app/store";
import { Region } from "react-native-maps";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import { useFetchRestAreasWithServicesQuery, useLoadRestAreasQuery } from "@/features/rest-areas";
import { useFetchPhotosQuery } from "@/features/photos";
import { selectFilters } from "@/features/filters";
import { useFetchServicesQuery, useGetRestAreaIdsForServicesQuery } from "@/features/services";

export function useMap(initialRegion: Region) {
  useFetchRestAreasWithServicesQuery();
  useFetchServicesQuery();
  useFetchPhotosQuery();

  const filters = useAppSelector(selectFilters);
  const { data: restAreaIds = [] } = useGetRestAreaIdsForServicesQuery(filters);
  const { data: allRestAreas = [] } = useLoadRestAreasQuery();

  const restAreas = useMemo(() => {
    if (restAreaIds === null) return allRestAreas;

    return allRestAreas.filter(restArea => restAreaIds.includes(restArea.id));
  }, [allRestAreas, restAreaIds]);

  const [region, setRegion] = useState(initialRegion);
  const { mapDimensions, onLayout } = useMapDimensions();
  const points = usePoints(restAreas, mapDimensions, region);

  return {
    setRegion,
    region,
    points,
    mapDimensions,
    onLayout,
  };
}
