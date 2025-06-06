import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome6";
import Popover from "react-native-popover-view";

export function AddPhotoButton() {
  return (
    <Popover
      from={
        <Pressable
          hitSlop={8}
          style={({ pressed }) => [styles.button, pressed && { backgroundColor: "#e0e0e0" }]}>
          <FontAwesome6 name="plus" size={24} color="#155196" />
          <Text>Lägg till foto</Text>
        </Pressable>
      }
      popoverStyle={styles.popoverContainer}
      arrowSize={{ width: 0, height: 0 }}>
      <View style={{ gap: 8 }}>
        <View>
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [styles.button, pressed && { backgroundColor: "#e0e0e0" }]}>
            <FontAwesome5 name="camera" size={24} color="#155196" />
            <Text>Kamera</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [styles.button, pressed && { backgroundColor: "#e0e0e0" }]}>
            <FontAwesome5 name="images" size={24} color="#155196" />
            <Text>Gallery</Text>
          </Pressable>
        </View>
      </View>
    </Popover>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 16,
    borderRadius: 4,
    borderColor: "#eee",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  popoverContainer: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
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
