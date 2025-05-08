import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../index";
import { ParkingInfoCard } from "@/features/rest-areas/components/parking";
import { useAppSelector } from "@/app/store";
import { selectRestAreaById } from "@/features/rest-areas/rest-area-slice";

type Props = NativeStackScreenProps<RootStackParamList, "ParkingInfoModal">;

export function ParkingInfoModal({ route }: Props) {
  const { id } = route.params;

  const parking = useAppSelector(state => selectRestAreaById(state, id));

  return parking && <ParkingInfoCard parking={parking} />;
}
