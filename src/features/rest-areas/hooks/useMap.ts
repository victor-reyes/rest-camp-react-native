import { useState } from "react";
import { Region } from "react-native-maps";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import { useParkings } from "./useParkings";
import { useGetParkingsQuery } from "../api";

export function useMap(initialRegion: Region) {
  useGetParkingsQuery();

  const parkings = useParkings();
  const [region, setRegion] = useState(initialRegion);
  const { mapDimensions, onLayout } = useMapDimensions();
  const points = usePoints(parkings, mapDimensions, region);

  return {
    setRegion,
    region,
    points,
    mapDimensions,
    onLayout,
  };
}
