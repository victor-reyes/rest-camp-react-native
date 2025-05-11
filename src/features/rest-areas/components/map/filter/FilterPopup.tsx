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
import { FilterCountBadge } from "./FilterCountBadge";

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

export function FilterPopup({ children: trigger }: Props) {
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
          {filterOptions.map((filter, index, array) => (
            <View key={filter}>
              <FilterItem
                key={filter}
                filter={filter}
                isActive={filters.includes(filter)}
                onValueChange={isEnabled => handleFilterPress(filter, isEnabled)}
              />
              {index < array.length - 1 && <View style={styles.divider} />}
            </View>
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
        style={({ pressed }) => [styles.triggerContainer, pressed && { backgroundColor: "#eee" }]}>
        <FilterCountBadge count={filters.length} />
        {trigger}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  triggerContainer: {
    height: 42,
    width: 42,
    backgroundColor: "#ffffffee",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignSelf: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 4,
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
