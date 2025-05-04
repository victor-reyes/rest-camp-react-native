import { View, Text, StyleSheet } from "react-native";

interface Props {
  name: string;
  modifiedTime: string;
}

export function ParkingHeader({ name, modifiedTime }: Props) {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerTitle}>{name}</Text>
        <Text style={styles.footerText}>
          Senast ändrad: {new Date(modifiedTime).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 6,
    color: "#666666",
  },
});
