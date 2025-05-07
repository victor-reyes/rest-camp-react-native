import { Parking } from "@/features/rest-areas/api/schemas";
import { useMemo } from "react";
import { isPointCluster, useClusterer } from "react-native-clusterer";
import Supercluster from "react-native-clusterer/lib/typescript/types";
import { Region } from "react-native-maps";
import { ParkingCluster, ParkingItem, ParkingPoint } from "../types";

export function usePoints(
  parkings: ParkingItem[],
  mapDimensions: { width: number; height: number },
  region: Region,
) {
  const memorizedPoints: Supercluster.PointFeature<ParkingItem>[] = useMemo(
    () =>
      parkings.map(parking => ({
        type: "Feature",
        id: parking.id,
        geometry: {
          type: "Point",
          coordinates: [parking.longitude, parking.latitude],
        },
        properties: { ...parking },
      })),
    [parkings],
  );

  const clusterOptions = { radius: 25, maxZoom: 12 };
  const [_points] = useClusterer(memorizedPoints, mapDimensions, region, clusterOptions);

  const points: (ParkingPoint | ParkingCluster)[] = _points.map(point => {
    if (isPointCluster(point))
      return {
        type: "Cluster",
        id: `cluster-${point.properties.cluster_id}`,
        coords: {
          latitude: point.geometry.coordinates[1],
          longitude: point.geometry.coordinates[0],
        },
        count: point.properties.point_count,
      };

    return { type: "Point", ...point.properties };
  });
  return points;
}
