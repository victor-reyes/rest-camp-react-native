import { useState } from "react";
import { Region } from "react-native-maps";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import { useFilters } from "./useFilters";
import { useSyncData } from "./useSyncData";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db";

export function useMap(initialRegion: Region) {
  useSyncData();

  const { data: parkings } = useLiveQuery(
    db.query.parkings.findMany({ with: { services: true, photos: true } }),
  );

  const { filters, setFilters, filteredParkings } = useFilters(parkings || []);
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
