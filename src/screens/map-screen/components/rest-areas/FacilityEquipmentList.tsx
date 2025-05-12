import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Service } from "@/slices/rest-areas";
import { ServiceIcon } from "./service-icons";

interface Props {
  services: Service[];
}
export function FacilityEquipmentList({ services }: Props) {
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
        {services.map(service => (
          <ServiceIcon key={service.name} name={service.name} size={40} color="#155196" />
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
