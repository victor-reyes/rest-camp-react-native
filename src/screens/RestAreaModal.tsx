import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RestAreaCard } from "./map-screen/components";
import { useAppSelector } from "@/app/store";
import { selectRestAreaById } from "@/features/rest-areas/rest-area-slice";
import { RootStackParamList } from "@/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "RestAreaModal">;

export function RestAreaModal({ route }: Props) {
  const { id } = route.params;

  const restArea = useAppSelector(state => selectRestAreaById(state, id));

  return restArea && <RestAreaCard restArea={restArea} />;
}
