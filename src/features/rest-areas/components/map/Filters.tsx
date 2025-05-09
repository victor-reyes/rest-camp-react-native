import { useEffect, useState } from "react";
import { Filter } from "../../types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Animated, Pressable, StyleSheet, Text, useAnimatedValue, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { filtersUpdated, selectFilters } from "../../rest-area-slice";

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
export function Filters() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handlePress = () => setOpen(!open);

  const handleFilterPress = (value: Filter) => {
    if (filters.includes(value))
      dispatch(filtersUpdated(filters.filter(filter => filter !== value)));
    else dispatch(filtersUpdated([...filters, value]));
  };

  const fadeAnim = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, open]);

  return (
    <>
      {open && (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          {filterOptions.map(({ label, value }) => (
            <Pressable
              key={value}
              onPress={() => handleFilterPress(value)}
              style={({ pressed }) => [styles.itemButton, pressed && { backgroundColor: "#eee" }]}>
              <FontAwesome
                name={filters.includes(value) ? "check-square-o" : "square-o"}
                size={24}
                style={{ height: 24, width: 24 }}
                color="#155196"
              />
              <Text>{label}</Text>
            </Pressable>
          ))}
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => setOpen(false)} style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
            <Pressable onPress={() => dispatch(filtersUpdated([]))} style={styles.button}>
              <Text style={styles.buttonText}>Rensa</Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
      <Pressable onPress={handlePress} style={styles.filterButtonContainer}>
        <FontAwesome name="filter" size={24} color="#aaa" />
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
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    gap: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 12,
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
