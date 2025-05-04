import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import type { RootStackParamList } from "../index";
import { useGetParkingByIdQuery } from "@/features/rest-areas/rest-areas-api";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ParkingInfoCard } from "@/features/rest-areas/components/parking";

type Props = NativeStackScreenProps<RootStackParamList, "ParkingInfoModal">;

export function ParkingInfoModal({ route }: Props) {
  const { id } = route.params;

  const { data: parking, isLoading, error, refetch } = useGetParkingByIdQuery(id);

  return (
    <View style={styles.container}>
      {parking && <ParkingInfoCard parking={parking} />}

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading parking information...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error" size={48} color="#D32F2F" />
          <Text style={styles.errorText}>Failed to load parking information</Text>
          <TouchableOpacity onPress={refetch}>
            <Text>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    marginVertical: 16,
    textAlign: "center",
  },
});
