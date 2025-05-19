import { Filter, Service } from "@/slices/rest-areas";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { ServiceIcon } from "./service-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

const filterNameMap: Record<Filter, string> = {
  refuseBin: "Sophantering",
  toilet: "Toalett",
  restaurant: "Restaurang",
  dumpingStation: "Latrintömning",
  picnicFacilities: "Rastplatsmöbler",
  touristInformation: "Turistinformation",
  playground: "Lekplats",
  petrolStation: "Drivmedel",
};

interface Props {
  services: Service[];
}

export function ServicePopover({ services }: Props) {
  return (
    <Popover
      popoverStyle={styles.popoverContainer}
      placement={PopoverPlacement.LEFT}
      from={
        <Pressable
          style={({ pressed }) => [styles.popoverButton, pressed ? { opacity: 0.5 } : null]}>
          <AntDesign name="questioncircleo" size={24} />
        </Pressable>
      }>
      <View>
        <Text style={styles.title}>Symbolförklaringar:</Text>
        {services.map(service => (
          <View key={service} style={styles.serviceRow}>
            <ServiceIcon name={service} size={32} />
            <Text key={service}>{filterNameMap[service]}</Text>
          </View>
        ))}
      </View>
    </Popover>
  );
}

const styles = StyleSheet.create({
  popoverContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  popoverButton: {
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
