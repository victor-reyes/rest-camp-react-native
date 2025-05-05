import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { Alert } from "react-native";
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
  );
}
