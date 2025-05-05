import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useMap } from "../../hooks/useMap";
import { FastMarker } from "./FastMarker";
import { RestAreaIcon } from "./RestAreaIcon";
import { useNavigation } from "@react-navigation/native";
import { MapControls } from "./MapController";
import { useCallback, useRef } from "react";

const initialRegion = { latitude: 62, latitudeDelta: 14, longitude: 18, longitudeDelta: 16 };
export function Map() {
  const mapRef = useRef<MapView>(null);
  const { region, points, setRegion, onLayout } = useMap(initialRegion);
  const navigation = useNavigation();

  const handleNavigateToParking = (id: string) => navigation.navigate("ParkingInfoModal", { id });
  const handleOnLocationUpdate = useCallback(
    (coords: { latitude: number; longitude: number }) =>
      mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 2, longitudeDelta: 2 }, 1000),
    [mapRef],
  );

  const handleOnClusterPress = async (coords: { latitude: number; longitude: number }) => {
    const toRegion = {
      ...coords,
      latitudeDelta: region.latitudeDelta / 3,
      longitudeDelta: region.longitudeDelta / 3,
    };
    mapRef.current?.animateToRegion(toRegion, 1500);
  };

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
        {points.map(point => {
          if (point.type === "Cluster") {
            const { id, coords, count } = point;
            return (
              <FastMarker key={id} {...coords} onPress={() => handleOnClusterPress(coords)}>
                <RestAreaIcon numberOfRestAreas={count} width={40} height={40} />
              </FastMarker>
            );
          }
          const { Id: id, Geometry: coords } = point;
          return (
            <FastMarker key={id} {...coords} onPress={() => handleNavigateToParking(id)}>
              <RestAreaIcon width={32} height={32} />
            </FastMarker>
          );
        })}
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
