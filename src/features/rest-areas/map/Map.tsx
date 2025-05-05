import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMap } from "../hooks/useMap";
import { FastMarker } from "./FastMarker";
import { RestAreaIcon } from "./RestAreaIcon";
import { useNavigation } from "@react-navigation/native";

const initialRegion = { latitude: 62, latitudeDelta: 14, longitude: 18, longitudeDelta: 16 };
export function Map() {
  const {
    mapRef,
    region,
    points,
    handleGetUserLocation,
    handleOnClusterPress,
    setRegion,
    onLayout,
  } = useMap(initialRegion);
  const navigation = useNavigation();

  const handleNavigateToParking = (id: string) => navigation.navigate("ParkingInfoModal", { id });

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
            const { id, coordinates, count } = point;
            return (
              <FastMarker key={id} {...coordinates} onPress={() => handleOnClusterPress(point)}>
                <RestAreaIcon numberOfRestAreas={count} width={40} height={40} />
              </FastMarker>
            );
          }
          const { Id: id, Geometry: coordinates } = point;
          return (
            <FastMarker key={id} {...coordinates} onPress={() => handleNavigateToParking(id)}>
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
