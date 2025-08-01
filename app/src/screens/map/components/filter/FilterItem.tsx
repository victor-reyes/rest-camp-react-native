import { Pressable, StyleSheet, Text } from "react-native";

import { ServiceIcon } from "@/screens/rest-area/components";
import { Filter } from "@/features/filters";

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
  isActive: boolean;
  filter: Filter;
  onValueChange: (value: boolean) => void;
}
export function FilterItem({ filter, isActive, onValueChange }: Props) {
  return (
    <Pressable
      onPress={() => onValueChange(!isActive)}
      style={({ pressed }) => [
        styles.itemButton,
        pressed && { backgroundColor: "#eee" },
        !isActive && { opacity: 0.5 },
      ]}>
      <ServiceIcon name={filter} size={32} />
      <Text style={styles.buttonText}>{filterNameMap[filter]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
