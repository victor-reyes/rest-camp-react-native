import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { VehicleCharacteristics } from "@/features/schemas";

interface Props {
  vehicleInfo: VehicleCharacteristics[];
}

export function VehicleInfo({ vehicleInfo }: Props) {
  return (
    <View style={[styles.section, styles.vehicleInfoContainer]}>
      <Text style={styles.sectionTitle}>Parking Capacity:</Text>
      {vehicleInfo.map(info => (
        <View key={info.VehicleType} style={styles.vehicleInfoItem}>
          {info.VehicleType === "car" ?
            <Fontisto name="car" size={24} color="#155196" />
          : <Fontisto name="truck" size={24} color="#155196" />}
          <Text style={styles.vehicleInfoText}>
            {info.NumberOfSpaces} {info.VehicleType}
            {info.NumberOfSpaces !== 1 ? "s" : ""}
          </Text>
        </View>
      ))}
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#155196",
  },
  vehicleInfoContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    alignContent: "center",
  },
  vehicleInfoItem: {
    columnGap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleInfoText: {
    fontSize: 14,
    color: "#333333",
  },
});
