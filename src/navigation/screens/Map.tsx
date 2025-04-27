import { useMemo, useState } from "react";
import MapView, { Marker, MarkerAnimated, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Supercluster, { MapDimensions } from "react-native-clusterer/lib/typescript/types";

import { StyleSheet, View, LayoutChangeEvent, Dimensions } from "react-native";
import { useGetParkingsQuery } from "@/features/rest-areas/rest-areas-api";
import { isPointCluster, useClusterer } from "react-native-clusterer";
import { Parking } from "@/features/rest-areas/parking-zod-schema";

const initialDimensions = Dimensions.get("window");

export default function Map() {
  const { data: parkings } = useGetParkingsQuery();
  const [region, setRegion] = useState<Region>({
    latitude: 59.62403,
    longitude: 14.26099,
    latitudeDelta: 0.01,
    longitudeDelta: 10.1,
  });

  const [mapDimensions, setMapDimensions] = useState<MapDimensions>(initialDimensions);

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

  const [points] = useClusterer(memorizedPoints, mapDimensions, region);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== mapDimensions.width || height !== mapDimensions.height)
      setMapDimensions({ width, height });
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <MapView
        style={styles.map}
        showsMyLocationButton={true}
        showsTraffic={true}
        provider={PROVIDER_GOOGLE}
        onRegionChange={setRegion}
        initialRegion={region}>
        {points.map(point => {
          if (isPointCluster(point))
            return (
              <Marker
                key={`cluster-${point.properties.cluster_id}`}
                coordinate={{
                  latitude: point.geometry.coordinates[1],
                  longitude: point.geometry.coordinates[0],
                }}
                title={`${point.properties.point_count} parkings`}
                description={`Cluster of ${point.properties.point_count} parkings`}
              />
            );

          const parking = point.properties;
          return (
            <MarkerAnimated
              key={parking.Id}
              coordinate={{
                latitude: parking.Geometry.latitude,
                longitude: parking.Geometry.longitude,
              }}
              title={parking.Name}
              description={parking.Description}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
