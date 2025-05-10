import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { FilterPopup } from "./filter/FilterPopup";

interface Props {
  onLocationUpdate: (coords: { latitude: number; longitude: number }) => void;
}
export function MapControls({ onLocationUpdate }: Props) {
  const handleGetUserLocation = async () => {
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      if (!canAskAgain)
        Alert.alert("Location permission denied", "Please enable location permission in settings.");
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();
    onLocationUpdate(coords);
  };

  return (
    <View style={styles.container}>
      <FilterPopup>
        <FontAwesome name="filter" size={24} color="#aaa" />
      </FilterPopup>
      <Pressable
        onPress={handleGetUserLocation}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <MaterialIcons name="gps-fixed" size={24} color="gray" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#ffffffee",
    padding: 8,
    borderRadius: 5,
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
  buttonPressed: {
    backgroundColor: "#fff",
  },
});
