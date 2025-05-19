import { StyleSheet, Text, View } from "react-native";
import { Service } from "@/slices/rest-areas";
import { ServiceIcon } from "./service-icons";
import { ServicePopover } from "./ServicePopover";

interface Props {
  services: Service[];
}
export function FacilityEquipmentList({ services }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.title}>Utrustning och Service:</Text>
        <ServicePopover services={services} />
      </View>
      <View style={styles.container}>
        {services.map(service => (
          <ServiceIcon key={service} name={service} size={40} />
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
