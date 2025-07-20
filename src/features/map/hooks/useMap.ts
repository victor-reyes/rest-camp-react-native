import { useState } from "react";
import { useAppSelector } from "@/app/store";
import { Region } from "react-native-maps";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import { useFetchRestAreasWithServicesQuery, useLoadRestAreasQuery } from "@/features/rest-areas";
import { useFetchPhotosQuery } from "@/features/photos";
import { selectFilters } from "@/features/filters";

export function useMap(initialRegion: Region) {
  useFetchRestAreasWithServicesQuery();
  useFetchPhotosQuery();

  const filters = useAppSelector(selectFilters);
  const { data } = useLoadRestAreasQuery(filters);

  const [region, setRegion] = useState(initialRegion);
  const { mapDimensions, onLayout } = useMapDimensions();
  const points = usePoints(data, mapDimensions, region);

  return {
    setRegion,
    region,
    points,
    mapDimensions,
    onLayout,
  };
}
