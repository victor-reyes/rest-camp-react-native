import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { ClusterMarker, RestAreaMarker, MapControls } from "./components";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { RestAreaModal } from "../rest-area/RestAreaModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMap } from "@/features/map";

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
      const camera = await mapRef.current?.getCamera();
      if (!camera) return;
      const zoom = camera.zoom ?? 1;
      camera.zoom = zoom + 1;

      camera.center = { latitude: coords.latitude, longitude: coords.longitude };
      mapRef.current?.animateCamera(camera, { duration: 500 });
    },
    [],
  );

  const handleOnLocationUpdate = useCallback(
    (coords: { latitude: number; longitude: number }) =>
      mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 2, longitudeDelta: 2 }, 1000),
    [],
  );

  const handleOnProfilePress = useCallback(() => navigation.navigate("Profile"), [navigation]);

  const insets = useSafeAreaInsets();
  const profileButtonTop = insets.top + Platform.select({ android: 12, default: 0 });
  const profileButtonStyle = useMemo(
    () => [styles.profileButton, { top: profileButtonTop }],
    [profileButtonTop],
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container} onLayout={onLayout}>
        <Pressable onPress={handleOnProfilePress} style={profileButtonStyle}>
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
              <ClusterMarker
                key={point.id}
                latitude={point.latitude}
                longitude={point.longitude}
                count={point.count}
                onClusterPress={handleOnClusterPress}
              />
            : <RestAreaMarker
                key={point.id}
                id={point.id}
                latitude={point.latitude}
                longitude={point.longitude}
                status={point.status}
                onRestAreaPress={handleOnRestAreaPress}
              />,
          )}
        </MapView>
        <View
          style={[
            styles.mapControlsContainer,
            { bottom: insets.bottom + Platform.select({ android: 12, default: 0 }) },
          ]}>
          <MapControls onLocationUpdate={handleOnLocationUpdate} />
        </View>
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
    right: 16,
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
  mapControlsContainer: {
    position: "absolute",
    right: 16,
    gap: 8,
  },
});
