import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../index";
import { RestAreaCard } from "@/features/rest-areas/components/rest-areas";
import { useAppSelector } from "@/app/store";
import { selectRestAreaById } from "@/features/rest-areas/rest-area-slice";

type Props = NativeStackScreenProps<RootStackParamList, "RestAreaModal">;

export function RestAreaModal({ route }: Props) {
  const { id } = route.params;

  const restArea = useAppSelector(state => selectRestAreaById(state, id));

  return restArea && <RestAreaCard restArea={restArea} />;
}
