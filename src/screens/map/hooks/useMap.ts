import { useState } from "react";
import { Region } from "react-native-maps";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import {
  useFetchPhotosQuery,
  useFetchRestAreasWithServicesQuery,
  useLoadRestAreasQuery,
} from "@/slices/rest-areas";
import { useAppSelector } from "@/app/store";
import { selectFilters } from "@/slices/filters";

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
