import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import type { RootStackParamList } from "../index";
import { ParkingInfoCard } from "@/features/rest-areas/components/parking";
import { useAppSelector } from "@/app/store";
import { selectRestAreaById } from "@/features/rest-areas/rest-area-slice";

type Props = NativeStackScreenProps<RootStackParamList, "ParkingInfoModal">;

export function ParkingInfoModal({ route }: Props) {
  const { id } = route.params;

  const parking = useAppSelector(state => selectRestAreaById(state, id));

  return <View style={styles.container}>{parking && <ParkingInfoCard parking={parking} />}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
