import { useMemo, useState } from "react";
import { Region } from "react-native-maps";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { isPointCluster, useClusterer } from "react-native-clusterer";
import Supercluster from "react-native-clusterer/lib/typescript/types";
import { useGetParkingsQuery } from "../rest-areas-api";
import { Parking } from "@/features/schemas";

type ParkingPoint = Parking & { type: "Point" };
export type ParkingCluster = {
  type: "Cluster";
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  count: number;
};

const { width, height } = Dimensions.get("window");
export function useMap(initialRegion: Region) {
  const { data: parkings } = useGetParkingsQuery();
  const [region, setRegion] = useState(initialRegion);
  const [mapDimensions, setMapDimensions] = useState({ width, height });

  const memorizedPoints: Supercluster.PointFeature<Parking>[] = useMemo(
    () =>
      (parkings ?? []).map(parking => ({
        type: "Feature",
        id: `point-${parking.Id}`,
        geometry: {
          type: "Point",
          coordinates: [parking.Geometry.longitude, parking.Geometry.latitude],
        },
        properties: { ...parking },
      })),
    [parkings],
  );

  const clusterOptions = { radius: 25, maxZoom: 12 };
  const [points] = useClusterer(memorizedPoints, mapDimensions, region, clusterOptions);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== mapDimensions.width || height !== mapDimensions.height)
      setMapDimensions({ width, height });
  };

  const filteredPoints: (ParkingPoint | ParkingCluster)[] = points.map(point => {
    if (isPointCluster(point))
      return {
        type: "Cluster",
        id: `cluster-${point.properties.cluster_id}`,
        coordinates: {
          latitude: point.geometry.coordinates[1],
          longitude: point.geometry.coordinates[0],
        },
        count: point.properties.point_count,
      };

    return { type: "Point", ...point.properties };
  });

  return {
    region,
    points: filteredPoints,
    mapDimensions,
    setRegion,
    onLayout,
  };
}
