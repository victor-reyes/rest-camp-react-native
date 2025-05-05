import { useState } from "react";
import { Region } from "react-native-maps";
import { useGetParkingsQuery } from "../rest-areas-api";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";

export function useMap(initialRegion: Region) {
  const { data } = useGetParkingsQuery();
  const [region, setRegion] = useState(initialRegion);
  const { mapDimensions, onLayout } = useMapDimensions();
  const points = usePoints(data, mapDimensions, region);
  return {
    region,
    points,
    mapDimensions,
    setRegion,
    onLayout,
  };
}
