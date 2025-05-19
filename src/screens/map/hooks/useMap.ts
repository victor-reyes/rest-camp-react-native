import { useEffect, useState } from "react";
import { Region } from "react-native-maps";
import { useMapDimensions } from "./useMapDimensions";
import { usePoints } from "./usePoints";
import { useRestAreas } from "./useRestAreas";
import { loadRestAreas, useRestAreasQuery } from "@/slices/rest-areas";
import { useAppDispatch } from "@/app/store";

export function useMap(initialRegion: Region) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadRestAreas());
  }, [dispatch]);

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
