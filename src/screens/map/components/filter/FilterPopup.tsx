import { View, Pressable, Text, StyleSheet, Modal, Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { filterAdded, filterRemoved, filtersCleared, selectFilters } from "@/slices/filters";
import { Filter } from "@/slices/rest-areas";
import { FilterItem } from "./FilterItem";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { FilterCountBadge } from "./FilterCountBadge";
import equal from "fast-deep-equal";

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
  children: ReactNode;
}

export function FilterPopup({ children: trigger }: Props) {
  const [open, setOpen] = useState(false);
  const handlePress = () => setOpen(!open);

  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleFilterPress = (filter: Filter, isEnabled: boolean) =>
    dispatch(isEnabled ? filterAdded(filter) : filterRemoved(filter));

  const triggerContainerRef = useRef<View>(null);
  const [popupPosition, setPopupPosition] = useState({ bottom: 0, right: 0 });

  useLayoutEffect(() => {
    if (open && triggerContainerRef.current) {
      triggerContainerRef.current.measureInWindow((x, y, triggerW) => {
        const { width, height } = Dimensions.get("window");
        const newPosition = { bottom: height - y + 8, right: width - x - triggerW };

        if (!equal(newPosition, popupPosition)) setPopupPosition(newPosition);
      });
    }
  }, [open, popupPosition]);

  return (
    <>
      {open && (
        <Modal visible={open} transparent animationType="fade">
          <Pressable onPress={() => setOpen(false)} style={styles.outerContainer} />
          <View style={[styles.container, popupPosition]}>
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

            <View style={styles.buttonsContainer}>
              <Pressable style={styles.button} onPress={() => setOpen(false)}>
                <Text style={styles.buttonText}>Använd</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => dispatch(filtersCleared())}>
                <Text style={styles.buttonText}>Rensa</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      <Pressable
        ref={triggerContainerRef}
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
  outerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    position: "absolute",
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
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
