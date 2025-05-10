import { useState } from "react";
import { Filter } from "../../../types";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  filterAdded,
  filterRemoved,
  filtersCleared,
  selectFilters,
} from "../../../rest-area-slice";
import { FilterItem } from "./FilterItem";
import { FilterButton } from "./FilterButton";

const filterOptions: { label: string; filter: Filter }[] = [
  { label: "Sophantering", filter: "refuseBin" },
  { label: "Toalett", filter: "toilet" },
  { label: "Restaurang", filter: "restaurant" },
  { label: "Latrintömning", filter: "dumpingStation" },
  { label: "Rastplatsmöbler", filter: "picnicFacilities" },
  { label: "Turistinformation", filter: "touristInformation" },
  { label: "Lekplats", filter: "playground" },
  { label: "Drivmedel", filter: "petrolStation" },
];
export function Filters() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handlePress = () => setOpen(!open);

  const handleFilterPress = (filter: Filter, isEnabled: boolean) =>
    dispatch(isEnabled ? filterAdded(filter) : filterRemoved(filter));

  return (
    <>
      {open && (
        <View style={styles.container}>
          {filterOptions.map(({ label, filter }) => (
            <FilterItem
              key={filter}
              label={label}
              value={filters.includes(filter)}
              onValueChange={isEnabled => handleFilterPress(filter, isEnabled)}
            />
          ))}
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => setOpen(false)} style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
            <Pressable onPress={() => dispatch(filtersCleared())} style={styles.button}>
              <Text style={styles.buttonText}>Rensa</Text>
            </Pressable>
          </View>
        </View>
      )}
      <FilterButton handlePress={handlePress} />
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 12,
  },
  button: {
    backgroundColor: "#155196",
    minWidth: 60,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
