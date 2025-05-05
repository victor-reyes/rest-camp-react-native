import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useMap } from "../../hooks/useMap";
import { useNavigation } from "@react-navigation/native";
import { MapControls } from "./MapController";
import { useCallback, useRef } from "react";
import { ParkingMarker } from "./ParkingMarker";
import { ClusterMarker } from "./ClusterMarker";

const initialRegion = { latitude: 62, latitudeDelta: 14, longitude: 18, longitudeDelta: 16 };
export function Map() {
  const mapRef = useRef<MapView>(null);
  const { region, points, setRegion, onLayout } = useMap(initialRegion);
  const navigation = useNavigation();

  const handleOnParkingPress = useCallback(
    (id: string) => navigation.navigate("ParkingInfoModal", { id }),
    [navigation],
  );
  const handleOnLocationUpdate = useCallback(
    (coords: { latitude: number; longitude: number }) =>
      mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 2, longitudeDelta: 2 }, 1000),
    [mapRef],
  );

  const handleOnClusterPress = useCallback(
    async (coords: { latitude: number; longitude: number }) => {
      const toRegion = {
        ...coords,
        latitudeDelta: region.latitudeDelta / 3,
        longitudeDelta: region.longitudeDelta / 3,
      };
      mapRef.current?.animateToRegion(toRegion, 1500);
    },
    [region],
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={setRegion}
        toolbarEnabled={false}
        showsMyLocationButton={false}
        showsUserLocation
        initialRegion={region}>
        {points.map(point =>
          point.type === "Cluster" ?
            <ClusterMarker key={point.id} {...point} onClusterPress={handleOnClusterPress} />
          : <ParkingMarker
              key={point.Id}
              id={point.Id}
              coords={point.Geometry}
              onParkingPress={handleOnParkingPress}
            />,
        )}
      </MapView>
      <MapControls onLocationUpdate={handleOnLocationUpdate} />
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
