import { useState } from "react";
import { Region } from "react-native-maps";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import { useRestAreas } from "./useRestAreas";
import { useRestAreasQuery } from "../api";

export function useMap(initialRegion: Region) {
  useRestAreasQuery();

  const restAreas = useRestAreas();
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
