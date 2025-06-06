import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export function AddPhotoButton() {
  return (
    <Pressable
      onPress={() => console.log("Add photo")}
      hitSlop={8}
      style={({ pressed }) => [styles.addPhotoButton, pressed && { backgroundColor: "#e0e0e0" }]}>
      <FontAwesome6 name="plus" size={24} color="#155196" />
      <Text>Lägg till foto</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addPhotoButton: {
    flexDirection: "row",
    gap: 4,
    padding: 4,
    borderRadius: 4,
    borderColor: "#eee",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
