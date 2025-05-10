import { Pressable, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  handlePress: () => void;
}

export function FilterButton({ handlePress }: Props) {
  return (
    <Pressable onPress={handlePress} style={styles.filterButtonContainer}>
      <FontAwesome name="filter" size={24} color="#aaa" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filterButtonContainer: {
    height: 42,
    width: 42,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    alignSelf: "flex-end",
  },
});
