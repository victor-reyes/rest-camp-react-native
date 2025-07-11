import { View, Text, StyleSheet, Pressable } from "react-native";
import { openMap } from "@/navigation/open-map";
import { MapIcon } from "@/components/icons";

interface Props {
  name: string;
  updatedAt: number;
  latitude: number;
  longitude: number;
}

export function ParkingHeader({ name, updatedAt, latitude, longitude }: Props) {
  const handleOpenMap = () => openMap({ latitude, longitude, label: name });
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerTitle}>{name}</Text>
        <Text style={styles.footerText}>
          Senast ändrad: {new Date(updatedAt).toLocaleDateString()}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
        onPress={handleOpenMap}>
        <MapIcon width={34} height={34} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 8,
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
  iconButton: {
    elevation: 2,
    borderRadius: 50,
    padding: 6,
    backgroundColor: "lightblue",
  },
  iconButtonPressed: { backgroundColor: "#eeeeee" },

  footerText: {
    fontSize: 6,
    color: "#666666",
  },
});
