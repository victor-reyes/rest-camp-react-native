import { StyleSheet, Text } from "react-native";

interface Props {
  count: number;
}
export function FilterCountBadge({ count }: Props) {
  return count > 0 && <Text style={styles.badge}>{count}</Text>;
}
const styles = StyleSheet.create({
  badge: {
    fontSize: 7,
    color: "#fff",
    position: "absolute",
    right: -2,
    top: -2,
    padding: 2,
    zIndex: 1,
    backgroundColor: "#155196dd",
    borderRadius: 10,
    width: 14,
    height: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
});
