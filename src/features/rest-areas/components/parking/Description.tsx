import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  description?: string;
  locationDescription?: string;
}

export function Description({ description, locationDescription }: Props) {
  if (!description && !locationDescription) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Information</Text>
      {description && <Text style={styles.descriptionText}>{description}</Text>}
      {locationDescription && (
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.locationText}>{locationDescription}</Text>
        </View>
      )}
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
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333333",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
});
