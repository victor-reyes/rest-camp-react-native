import { useState } from "react";
import { Region } from "react-native-maps";
import { useGetParkingsQuery } from "../rest-areas-api";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import { useFilters } from "./useFilters";

export function useMap(initialRegion: Region) {
  const { data } = useGetParkingsQuery();
  const { filters, setFilters, filteredParkings } = useFilters(data || []);
  const [region, setRegion] = useState(initialRegion);
  const { mapDimensions, onLayout } = useMapDimensions();
  const points = usePoints(filteredParkings, mapDimensions, region);
  return {
    filters,
    setFilters,
    setRegion,
    region,
    points,
    mapDimensions,
    onLayout,
  };
}
