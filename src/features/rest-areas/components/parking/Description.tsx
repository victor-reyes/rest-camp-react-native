import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  description?: string;
  locationDescription?: string;
  distanceToNearestCity?: string;
}

export function Description({ description, locationDescription, distanceToNearestCity }: Props) {
  if (!description && !locationDescription && !distanceToNearestCity) return null;
  const info = [locationDescription, distanceToNearestCity].filter(Boolean).join(" ");
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Information</Text>
      {description && <Text style={styles.descriptionText}>{description}</Text>}
      {info && <Text style={styles.locationText}>🧭 {info}</Text>}
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
  locationText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
});
