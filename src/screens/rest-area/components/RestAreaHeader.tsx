import { View, Text, StyleSheet, Pressable } from "react-native";
import { openMap } from "@/navigation/open-map";
import { MapIcon } from "@/components";
import { Score } from "./Score";

interface Props {
  id: string;
  name: string;
  updatedAt: number;
  latitude: number;
  longitude: number;
}

export function ParkingHeader({ id, name, updatedAt, latitude, longitude }: Props) {
  const handleOpenMap = () => openMap({ latitude, longitude, label: name });
  const handleScoreClick = () => {};
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerTitle}>{name}</Text>
        <Score restAreaId={id} onClick={handleScoreClick} />
      </View>

      <View>
        <Pressable
          style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
          onPress={handleOpenMap}>
          <MapIcon width={34} height={34} />
        </Pressable>
        <Text style={styles.footerText}>
          Senast ändrad: {new Date(updatedAt).toLocaleDateString()}
        </Text>
      </View>
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
    alignSelf: "flex-end",
    elevation: 2,
    borderRadius: 50,
    padding: 6,
    backgroundColor: "lightblue",
  },
  iconButtonPressed: { backgroundColor: "#eeeeee" },

  footerText: {
    marginTop: 4,
    fontSize: 6,
    color: "#666666",
  },
});
