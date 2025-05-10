import { View, Pressable, Text, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  filterAdded,
  filterRemoved,
  filtersCleared,
  selectFilters,
} from "@/features/rest-areas/rest-area-slice";
import { Filter } from "@/features/rest-areas/types";
import { FilterItem } from "./FilterItem";

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

interface Props {
  setOpen: (open: boolean) => void;
}

export function FilterPopup({ setOpen }: Props) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleFilterPress = (filter: Filter, isEnabled: boolean) =>
    dispatch(isEnabled ? filterAdded(filter) : filterRemoved(filter));

  return (
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
        <Pressable style={styles.button} onPress={() => setOpen(false)}>
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => dispatch(filtersCleared())}>
          <Text style={styles.buttonText}>Rensa</Text>
        </Pressable>
      </View>
    </View>
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
