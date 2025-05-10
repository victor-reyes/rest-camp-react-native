import { Pressable, StyleSheet, Text, View } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import {
  HWC,
  Info,
  Latrine,
  PetrolStation,
  Picnic,
  Playground,
  Restaurant,
  Trash,
} from "./service-icons";
import { Service } from "../../types";

interface Props {
  services: Service[];
}
export function FacilityEquipmentList({ services }: Props) {
  const icons = services.map(service => {
    const type = service.name;
    switch (type) {
      case "toilet":
        return <HWC />;
      case "picnicFacilities":
        return <Picnic />;
      case "playground":
        return <Playground />;
      case "dumpingStation":
        return <Latrine />;
      case "refuseBin":
        return <Trash />;
      case "touristInformation":
        return <Info />;
      case "restaurant":
        return <Restaurant />;
      case "petrolStation":
        return <PetrolStation />;
    }
  });
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.title}>Utrustning och Service:</Text>
        <Pressable
          onPress={() => console.log("Show all")}
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : null)}>
          <AntDesign name="questioncircleo" size={20} color="black" />
        </Pressable>
      </View>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <View key={index} style={{ width: 40, height: 40 }}>
            {icon}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  sectionTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#155196",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
});
