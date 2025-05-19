import { useNavigation } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { ClusterMarker, RestAreaMarker, MapControls } from "./components";
import { useMap } from "./hooks/useMap";

const initialRegion = { latitude: 62, latitudeDelta: 14, longitude: 18, longitudeDelta: 16 };

export function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const { region, points, setRegion, onLayout } = useMap(initialRegion);
  const navigation = useNavigation();

  const handleOnRestAreaPress = useCallback(
    (id: string) => navigation.navigate("RestAreaModal", { id }),
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
          : <RestAreaMarker
              key={point.id}
              id={point.id}
              coords={{ latitude: point.latitude, longitude: point.longitude }}
              onRestAreaPress={handleOnRestAreaPress}
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
