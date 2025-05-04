import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { OpenStatus, OperationStatus } from "@/features/schemas";

interface Props {
  name: string;
  openStatus: OpenStatus;
  operationStatus?: OperationStatus;
  modifiedTime: string;
}

export function ParkingHeader({ name, openStatus, operationStatus, modifiedTime }: Props) {
  const getStatusColor = () => {
    if (openStatus === "closed") return "#D32F2F";
    if (operationStatus === "limitedOperation") return "#FFA000";
    if (operationStatus === "outOfService") return "#D32F2F";
    return "#4CAF50";
  };

  const getStatusText = () => {
    if (openStatus === "closed") return "Avstängt";
    if (operationStatus === "limitedOperation") return "Driftbegränsning";
    if (operationStatus === "outOfService") return "Ur funktion";
    return "Öppen";
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{name}</Text>
      <View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
        <Text style={styles.footerText}>
          Senast ändrad: {new Date(modifiedTime).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 16,
    alignSelf: "flex-end",
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  footerText: {
    fontSize: 8,
    color: "#666666",
    marginTop: 4,
  },
});
