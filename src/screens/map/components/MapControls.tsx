import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { Linking, Pressable, StyleSheet } from "react-native";
import { FilterPopup } from "./filter/FilterPopup";
import Toast from "react-native-toast-message";

interface Props {
  onLocationUpdate: (coords: { latitude: number; longitude: number }) => void;
}
export function MapControls({ onLocationUpdate }: Props) {
  const handleGetUserLocation = async () => {
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      if (!canAskAgain)
        Toast.show({
          type: "info",
          text1: "Platstillstånd nekades",
          text2: "Pressa på knappen för att gå till inställningar.",
          onPress: () => Linking.openSettings(),
        });
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();
    onLocationUpdate(coords);
  };

  return (
    <>
      <FilterPopup>
        <FontAwesome name="filter" size={24} color="#aaa" />
      </FilterPopup>
      <Pressable
        onPress={handleGetUserLocation}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <MaterialIcons name="gps-fixed" size={24} color="gray" />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
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
