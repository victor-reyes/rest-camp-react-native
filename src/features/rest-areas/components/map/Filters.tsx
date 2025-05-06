import { useState } from "react";
import { Filter } from "../../types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
}

const filterOptions: { label: string; value: Filter }[] = [
  { label: "Sophantering", value: "refuseBin" },
  { label: "Toalett", value: "toilet" },
  { label: "Restaurang", value: "restaurant" },
  { label: "Latrintömning", value: "dumpingStation" },
  { label: "Rastplatsmöbler", value: "picnicFacilities" },
  { label: "Turistinformation", value: "touristInformation" },
  { label: "Lekplats", value: "playground" },
  { label: "Drivmedel", value: "petrolStation" },
];
export function Filters({ filters, setFilters }: Props) {
  const [open, setOpen] = useState(false);

  const handlePress = () => setOpen(!open);

  const handleFilterPress = (value: Filter) => {
    if (filters.includes(value)) setFilters(filters.filter(filter => filter !== value));
    else setFilters([...filters, value]);
  };

  return (
    <>
      <Pressable onPress={handlePress}>
        <FontAwesome name="filter" size={32} color="#eee" />
      </Pressable>
      {open && (
        <View style={styles.container}>
          {filterOptions.map(({ label, value }) => (
            <Pressable
              key={value}
              onPress={() => handleFilterPress(value)}
              style={({ pressed }) => [
                styles.filterButton,
                pressed && { backgroundColor: "#eee" },
              ]}>
              <FontAwesome
                name={filters.includes(value) ? "check-square-o" : "square-o"}
                size={24}
                style={{ height: 24, width: 24 }}
                color="#155196"
              />
              <Text>{label}</Text>
            </Pressable>
          ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}>
            <Pressable onPress={() => setOpen(false)} style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
            <Pressable onPress={() => setFilters([])} style={styles.button}>
              <Text style={styles.buttonText}>Rensa</Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBlockColor: "black",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    gap: 8,
  },
  button: {
    backgroundColor: "#155196",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
