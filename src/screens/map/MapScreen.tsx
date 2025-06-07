import { useNavigation } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { ClusterMarker, RestAreaMarker, MapControls } from "./components";
import { useMap } from "./hooks/useMap";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { RestAreaModal } from "../rest-area/RestAreaModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const initialRegion = { latitude: 62, latitudeDelta: 14, longitude: 18, longitudeDelta: 16 };

export function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const { region, points, setRegion, onLayout } = useMap(initialRegion);
  const navigation = useNavigation();

  const handleOnRestAreaPress = useCallback((id: string) => setCurrentRestAreaId(id), []);
  const handleOnRestAreaModalClose = useCallback(() => setCurrentRestAreaId(null), []);
  const [currentRestAreaId, setCurrentRestAreaId] = useState<string | null>(null);

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

  const handleOnLocationUpdate = useCallback(
    (coords: { latitude: number; longitude: number }) =>
      mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 2, longitudeDelta: 2 }, 1000),
    [mapRef],
  );

  const handleOnProfilePress = () => navigation.navigate("Profile");

  return (
    <BottomSheetModalProvider>
      <View style={styles.container} onLayout={onLayout}>
        <Pressable onPress={handleOnProfilePress} style={[styles.profileButton]}>
          <FontAwesome5 name="user" size={18} color="gray" />
        </Pressable>
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
        <RestAreaModal id={currentRestAreaId} onClose={handleOnRestAreaModalClose} />
      </View>
    </BottomSheetModalProvider>
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
  profileButton: {
    position: "absolute",
    top: 36,
    right: 18,
    zIndex: 1,
    backgroundColor: "#ffffffee",
    padding: 8,
    borderRadius: 25,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
