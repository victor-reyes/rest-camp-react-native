import { useMemo, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Supercluster from "react-native-clusterer/lib/typescript/types";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View, LayoutChangeEvent, Dimensions, Alert } from "react-native";
import { isPointCluster, useClusterer } from "react-native-clusterer";

import { useGetParkingsQuery } from "../rest-areas-api";
import { Parking } from "../parking-zod-schema";
import { FastMarker } from "./FastMarker";
import { RestAreaIcon } from "./RestAreaIcon";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const initialRegion = { latitude: 62, latitudeDelta: 14, longitude: 18, longitudeDelta: 16 };

export function Map() {
  const { data: parkings } = useGetParkingsQuery();
  const [region, setRegion] = useState(initialRegion);

  const [mapDimensions, setMapDimensions] = useState({ width, height });

  const handleGetUserLocation = async () => {
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      if (!canAskAgain)
        Alert.alert("Location permission denied", "Please enable location permission in settings.");
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 3, longitudeDelta: 3 }, 1000);
  };

  const mapRef = useRef<MapView>(null);

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

  const handleOnClusterPress = async (cluster: Supercluster.ClusterFeature<unknown>) => {
    const { latitude, longitude } = cluster.properties.getExpansionRegion();
    const toRegion = {
      latitude,
      longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    mapRef.current?.animateToRegion(toRegion, 1500);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container} onLayout={onLayout}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onRegionChange={setRegion}
        toolbarEnabled={false}
        showsMyLocationButton={false}
        showsUserLocation
        initialRegion={region}>
        {points?.map(point => {
          if (isPointCluster(point))
            return (
              <FastMarker
                key={`cluster-${point.properties.cluster_id}`}
                latitude={point.geometry.coordinates[1]}
                longitude={point.geometry.coordinates[0]}
                onPress={() => handleOnClusterPress(point)}>
                <RestAreaIcon
                  numberOfRestAreas={point.properties.point_count}
                  width={40}
                  height={40}
                />
              </FastMarker>
            );

          return (
            <FastMarker
              key={point.properties.Id}
              latitude={point.properties.Geometry.latitude}
              longitude={point.properties.Geometry.longitude}
              onPress={() => navigation.navigate("ParkingInfoModal", { id: point.properties.Id! })}>
              <RestAreaIcon width={32} height={32} />
            </FastMarker>
          );
        })}
      </MapView>
      <MaterialIcons
        name="gps-fixed"
        size={24}
        color="gray"
        zIndex={1000}
        position="absolute"
        bottom={20}
        right={20}
        backgroundColor="#ffffffdd"
        padding={10}
        style={{ borderRadius: 5, zIndex: 1000 }}
        onPress={handleGetUserLocation}
      />
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
