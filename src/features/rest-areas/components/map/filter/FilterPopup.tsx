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
import { useState } from "react";

const filterOptions: Filter[] = [
  "refuseBin",
  "toilet",
  "restaurant",
  "dumpingStation",
  "picnicFacilities",
  "touristInformation",
  "playground",
  "petrolStation",
];

interface Props {
  children: React.ReactNode;
}

export function FilterPopup({ children }: Props) {
  const [open, setOpen] = useState(false);
  const handlePress = () => setOpen(!open);

  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleFilterPress = (filter: Filter, isEnabled: boolean) =>
    dispatch(isEnabled ? filterAdded(filter) : filterRemoved(filter));

  return (
    <>
      {open && (
        <View style={styles.container}>
          {filterOptions.map(filter => (
            <FilterItem
              key={filter}
              filter={filter}
              isActive={filters.includes(filter)}
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
      )}
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.filterButtonContainer,
          pressed && { backgroundColor: "#eee" },
        ]}>
        {children}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  filterButtonContainer: {
    height: 42,
    width: 42,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    alignSelf: "flex-end",
  },
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
