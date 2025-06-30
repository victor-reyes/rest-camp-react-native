import { useMemo } from "react";
import { isPointCluster, useClusterer } from "react-native-clusterer";
import Supercluster from "react-native-clusterer/lib/typescript/types";
import { Region } from "react-native-maps";
import { RestAreaStatus, Point } from "@/slices/rest-areas";

export function usePoints(
  restAreas: RestAreaStatus[] = [],
  mapDimensions: { width: number; height: number },
  region: Region,
) {
  const memorizedPoints: Supercluster.PointFeature<RestAreaStatus>[] = useMemo(
    () =>
      restAreas.map(restArea => ({
        type: "Feature",
        id: restArea.id,
        geometry: {
          type: "Point",
          coordinates: [restArea.longitude, restArea.latitude],
        },
        properties: { ...restArea },
      })),
    [restAreas],
  );

  const clusterOptions = { radius: 25, maxZoom: 12 };
  const [_points] = useClusterer(memorizedPoints, mapDimensions, region, clusterOptions);

  const points: Point[] = _points.map(point => {
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
