import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, StyleSheet } from "react-native";
import type { RootStackParamList } from "../index";
import { useGetParkingByIdQuery } from "@/features/rest-areas/rest-areas-api";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "ParkingInfoModal">;

export function ParkingInfoModal({ route }: Props) {
  const { id } = route.params;
  const navigation = useNavigation();

  const { data: parking, isLoading, error, refetch } = useGetParkingByIdQuery(id);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
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

      {parking && <Text>Parking ID: {parking.Id}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 12,
    backgroundColor: "white",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
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
