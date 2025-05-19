import { StyleSheet, Text, View } from "react-native";

interface Props {
  count: number;
}
export function FilterCountBadge({ count }: Props) {
  return (
    count > 0 && (
      <View style={styles.badge}>
        <Text style={styles.text}>{count}</Text>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -2,
    top: -2,
    padding: 2,
    zIndex: 1,
    width: 14,
    height: 14,
    backgroundColor: "#155196dd",
    overflow: "hidden",
    textAlignVertical: "center",
    borderRadius: 7,
  },
  text: {
    fontSize: 7,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
