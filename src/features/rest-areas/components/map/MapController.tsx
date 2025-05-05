import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { Alert, Pressable, StyleSheet } from "react-native";

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
    <Pressable
      onPress={handleGetUserLocation}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
      <MaterialIcons name="gps-fixed" size={24} color="gray" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ffffffcc",
    padding: 10,
    borderRadius: 5,
    zIndex: 100,
  },
  buttonPressed: {
    backgroundColor: "#fff",
  },
});
