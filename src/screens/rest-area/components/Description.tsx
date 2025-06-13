import { Status } from "@/slices/rest-areas";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  description?: string;
  locationDescription?: string;
  status: Status;
}

export function Description({ description, locationDescription, status }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Information</Text>
        <View style={[styles.statusContainer, { backgroundColor: getStatusColor(status) }]}>
          <Text style={styles.statusText}>{getStatusText(status)}</Text>
        </View>
      </View>
      {description && <Text style={styles.descriptionText}>{description}</Text>}
      {locationDescription && <Text style={styles.locationText}>🧭 {locationDescription}</Text>}
    </View>
  );
}

const getStatusText = (status: Status) => {
  switch (status) {
    case "inOperation":
      return "Ok";
    case "limitedOperation":
      return "Begränsad";
    case "outOfService":
      return "Ur drift";
    default:
      return "Unknown Status";
  }
};

const getStatusColor = (status: Status) => {
  switch (status) {
    case "inOperation":
      return "#28a745";
    case "limitedOperation":
      return "#FFC107";
    case "outOfService":
      return "#DC3545";
    default:
      return "#6C757D";
  }
};

const styles = StyleSheet.create({
  section: {
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#155196",
  },
  statusContainer: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
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
