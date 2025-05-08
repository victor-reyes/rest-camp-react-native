import { useState } from "react";
import { Region } from "react-native-maps";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import { useFilters } from "./useFilters";
import { useParkings } from "./useParkings";
import { useGetParkingsQuery } from "../api";

export function useMap(initialRegion: Region) {
  useGetParkingsQuery();

  const parkings = useParkings();

  const { filters, setFilters, filteredParkings } = useFilters(parkings);
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
